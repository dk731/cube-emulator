#include <iostream>
#include <sstream>

#include <thread>
#include <string>
#include <mutex>
#include <list>
#include <chrono>

#include <string.h>

#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#include <openssl/sha.h>
#include <openssl/bio.h>
#include <openssl/evp.h>
#include <math.h>

#define MAX_IN_MSG_SIZE 20000

class ClientObj
{
public:
  int my_server_fd;
  bool accepted = false;

  std::thread main_thread_t;
  std::thread on_message_thread_t;

  int socket_fd;
  struct sockaddr addr;
  unsigned char buf[MAX_IN_MSG_SIZE]; // buffer for storing messages

  void send_data(const char *data, int size);
  void start();
  ClientObj(int server_fd);

  static int sockaddr_size;
  static std::string handhsake_head;
  static char magic_str[];

private:
  void main_thread();
  void on_message_thread();

  static unsigned char *gen_acc_key(const char *in_key);

  static const char separator[];
  static const char key_line[];
};

class SocketServer
{
public:
  std::list<ClientObj *> clients;

  SocketServer(const char *ip, unsigned short port);
  void start();
  void stop();

  void (*on_message)(int) = nullptr;
  void (*on_open)(int) = nullptr;
  void (*on_close)(int) = nullptr;

  static int MAX_SOCKET_CONS;
  static std::mutex send_sync;

private:
  int server_fd;
  struct sockaddr_in server_addr;

  std::thread accept_cons_t;
  void accept_cons_thread();

  bool running = false;

  std::stringstream error_msg;
};