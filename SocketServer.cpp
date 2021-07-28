#include "SocketServer.h"

std::mutex SocketServer::send_sync;
int SocketServer::MAX_SOCKET_CONS = 30;

std::string ClientObj::handhsake_head = "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ";
int ClientObj::sockaddr_size = sizeof(struct sockaddr_in);
char ClientObj::magic_str[] = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const char ClientObj::separator[] = "\r\n";
const char ClientObj::key_line[] = "Sec-WebSocket-Key: ";

SocketServer::SocketServer(const char *ip, unsigned short port)
{
  server_fd = socket(AF_INET, SOCK_STREAM, 0);

  memset(&server_addr, 0, sizeof(struct sockaddr_in));

  server_addr.sin_family = AF_INET;
  server_addr.sin_port = htons(port);
  server_addr.sin_addr.s_addr = inet_addr(ip);
  int res;
  if (res = bind(server_fd, (sockaddr *)&server_addr, sizeof(server_addr)))
  {
    error_msg.clear();
    error_msg << "Unable to bind to: " << ip << ":" << port << "  bind return: " << res << std::endl;
    throw std::runtime_error(error_msg.str());
  }
}

void SocketServer::start()
{
  if (listen(server_fd, MAX_SOCKET_CONS))
  {
    error_msg.clear();
    error_msg << "Error during call of listen" << std::endl;
    throw std::runtime_error(error_msg.str());
  }
  accept_cons_t = std::thread(&SocketServer::accept_cons_thread, this);
  accept_cons_t.detach();
  running = true;
}

void SocketServer::stop()
{
}

void SocketServer::accept_cons_thread()
{
  int ssize = 16;
  while (running)
  {
    ClientObj *tmp_client = new ClientObj(server_fd);

    if (!tmp_client->accepted)
    {
      std::cout << "Was unable to accept connection..." << std::endl;
      continue;
    }

    tmp_client->start();
    clients.push_back(tmp_client);
    // return;
  }
}

unsigned char *ClientObj::gen_acc_key(const char *in_key)
{
  int cur_key_len = strlen(in_key) + 36; // + len of magic string
  char *cur_key = (char *)malloc(cur_key_len);
  strcpy(cur_key, in_key);
  strcat(cur_key, ClientObj::magic_str);

  ///// SHA1 on concated string
  SHA_CTX shactx;
  char digest[SHA_DIGEST_LENGTH];
  SHA1_Init(&shactx);
  SHA1_Update(&shactx, cur_key, cur_key_len);
  SHA1_Final((unsigned char *)digest, &shactx);
  /////

  ///// Encode to base64
  BIO *bio, *b64;
  FILE *stream;
  int encoded_size = 4 * ceil((double)SHA_DIGEST_LENGTH / 3.0);
  unsigned char *buffer = (unsigned char *)malloc(encoded_size + 1);
  stream = fmemopen(buffer, encoded_size + 1, "w");
  b64 = BIO_new(BIO_f_base64());
  bio = BIO_new_fp(stream, BIO_NOCLOSE);
  bio = BIO_push(b64, bio);
  BIO_set_flags(bio, BIO_FLAGS_BASE64_NO_NL);
  BIO_write(bio, digest, SHA_DIGEST_LENGTH);
  BIO_flush(bio);
  BIO_free_all(bio);
  /////

  fclose(stream);
  free(cur_key);

  return buffer;
}

void ClientObj::send_data(const char *data, int size)
{
  SocketServer::send_sync.lock();
  if (send(socket_fd, data, size, 0) == -1)
    std::cout << "Was enable to send message to: " << socket_fd << " with length: " << size << std::endl;
  SocketServer::send_sync.unlock();
}

ClientObj::ClientObj(int server_fd) : my_server_fd(server_fd)
{
  socket_fd = accept(server_fd, &addr, (socklen_t *)&ClientObj::sockaddr_size);
  accepted = socket_fd != -1;
}

void ClientObj::start()
{
  main_thread_t = std::thread(&ClientObj::main_thread, this);
  main_thread_t.detach();
}

void ClientObj::main_thread()
{
  recv(socket_fd, buf, MAX_IN_MSG_SIZE, 0);

  char *line;
  line = strtok((char *)buf, ClientObj::separator);
  char *sec_key;
  while (line != nullptr) // Find line with 'Sec-WebSocket-Key: '
  {
    if ((sec_key = strstr(line, ClientObj::key_line)) != nullptr)
      break;
    line = strtok(NULL, ClientObj::separator);
  }

  if (sec_key == nullptr)
    return;

  sec_key += 19;
  sec_key[24] = 0;

  std::string ret_key((char *)ClientObj::gen_acc_key(sec_key));
  std::string handshake = ClientObj::handhsake_head + ret_key + "\r\n\r\n\r\n";
  send_data(handshake.c_str(), handshake.length());

  while (1)
  {
    std::cout << "Socket is oppened!" << std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(1000));
  }
}