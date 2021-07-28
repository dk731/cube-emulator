
#include <openssl/sha.h>
#include <openssl/bio.h>
#include <openssl/evp.h>
#include <string.h>
#include <stdio.h>
#include <math.h>

int main()
{
  char message[] = "dGhlIHNhbXBsZSBub25jZQ==258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
  printf("%s   ->\nBase64:   %s\nSHA1:   %s\nSHA1/Base64:    %s\n", message, base64(message), sha1(message), base64(sha1(message)));
}