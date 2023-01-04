#include <string.h>
#include <stdio.h>
#include <cs50.h>
#include <stdlib.h>
#include <ctype.h>

int main(int argc, char *argv[])
{
    // The user must pass only the key
    if (argc != 2)
    {
        printf("Must have only one argument\n");
        return 1;
    }
    string key = argv[1];
    int n = strlen(key);

    // Checks if the key contains the whole alphabet
    if (n != 26)
    {
        printf("Key must contain 26 characters\n");
        return 1;
    }
    char check[26];
    for (int i = 0; i < n; i++)
    {
        // Checks if the cli argument was really a number
        if (toupper(key[i]) < 'A' || toupper(key[i]) > 'Z')
        {
            printf("Invalid key\n");
            return 1;
        }
        else
        {
            check[toupper(key[i]) - 'A'] = toupper(key[i]);
            key[i] = toupper(key[i]);
        }
    }

    // Checks if there are duplicate characters in the key
    for (int i = 0; i < 26; i++)
    {
        if (check[i] == 0 || check[i] < 'A' || check[i] > 'Z')
        {
            printf("Key with duplicate characters\n");
            return 1;
        }
    }

    // Gets the plaintext and begin the translation
    string plaintext = get_string("plaintext: ");
    printf("ciphertext: ");
    for (int i = 0, m = strlen(plaintext); i < m; i++)
    {
        // Checks if it's a letter
        if (plaintext[i] >= 'A' && plaintext[i] <= 'Z')
        {
            // Gets the index in the key
            printf("%c", key[(int)(plaintext[i] - 'A')]);
        }
        else if (plaintext[i] >= 'a' && plaintext[i] <= 'z')
        {
            // Gets the index in the key by making it uppercase
            printf("%c", tolower(key[(int)(toupper(plaintext[i]) - 'A')]));
        }
        // Just print the character without the cipher if it's not a letter
        else
        {
            printf("%c", plaintext[i]);
        }
    }

    printf("\n");

    return 0;
}