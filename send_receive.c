#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <ws.h>

#define BUF_SIZE 15000

int cur_fd = 6667772;
bool found = false;
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
	found  = true;
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

int main()
{

	char buf[BUF_SIZE]; /* Register events. */
	for (int i = 0; i < BUF_SIZE; i++)
	{
		buf[i] = i % 255;
	}
	struct ws_events evs;
	evs.onopen    = &onopen;
	evs.onclose   = &onclose;
	evs.onmessage = &onmessage;

	ws_socket(&evs, 8080, 1);
	sleep(1);
	int count = 0;
	while (1)
	{
		if (found)
		{
			printf("Sending: %d\n", count++);
			ws_sendframe(cur_fd, buf, BUF_SIZE, false, WS_FR_OP_BIN);
		}
	}

	return 0;
}
