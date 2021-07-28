#include "SocketServer.h"

int main()
{
  SocketServer my_server("127.0.0.1", 8080);
  my_server.start();

  int a;
  std::cin >> a;
}