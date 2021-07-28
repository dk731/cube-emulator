#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <thread>
#include <chrono>

extern "C"
{
#include <ws.h>
}

#define BUF_SIZE 12288
#define GET_MILLIS() std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()

int cur_fd = 6667772;
bool found = false;
int ccount = 0;
/**
 * @brief This function is called whenever a new connection is opened.
 * @param fd The new client file descriptor.
 */

void onopen(int fd)
{
	char *cli;
	cli = ws_getaddress(fd);
	printf("Connection opened, client: %d | addr: %s\n", fd, cli);
	free(cli);
	cur_fd = fd;
	found = true;
}

/**
 * @brief This function is called whenever a connection is closed.
 * @param fd The client file descriptor.
 */
void onclose(int fd)
{
	char *cli;
	cli = ws_getaddress(fd);
	printf("Connection closed, client: %d | addr: %s\n", fd, cli);
	free(cli);
	found = false;
}

/**
 * @brief Message events goes here.
 * @param fd   Client file descriptor.
 * @param msg  Message content.
 * @param size Message size.
 * @param type Message type.
 */
void onmessage(int fd, const unsigned char *msg, uint64_t size, int type)
{
	char *cli;
	cli = ws_getaddress(fd);
	printf("I receive a message: %s (%zu), from: %s/%d\n", msg, size, cli, fd);

	sleep(2);
	ws_sendframe_txt(fd, "hello", false);
	sleep(2);
	ws_sendframe_txt(fd, "world", false);

	free(cli);
}

void print_count()
{
	while (1)
	{
		printf("%d\n", ccount);
		ccount = 0;
		sleep(1);
	}
}

int main()
{

	char buf[BUF_SIZE]; /* Register events. */
	struct ws_events evs;
	evs.onopen = &onopen;
	evs.onclose = &onclose;
	evs.onmessage = &onmessage;

	ws_socket(&evs, 8080, 100);
	printf("weee\n");
	sleep(1);
	unsigned char count = 0;
	int dir = -1;
	long prev_call = GET_MILLIS();
	std::thread qwe(print_count);
	qwe.detach();
	while (1)
	{
		memset(buf, count, BUF_SIZE);
		if (count == 255 || count == 0)
			dir *= -1;
		count += dir;
		// ws_sendframe(cur_fd, buf, BUF_SIZE, false, WS_FR_OP_BIN);
		ws_sendframe(cur_fd, buf, BUF_SIZE, false, WS_FR_OP_BIN);
		ccount += 1;
	}

	return 0;
}
