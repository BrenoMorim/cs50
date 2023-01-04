#include <string.h>
#include <stdio.h>
#include <cs50.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    // The user must pass only the key
    if (argc != 2)
    {
        return 1;
    }
    string input = argv[1];
    for (int i = 0, n = strlen(input); i < n; i++)
    {
        // Checks if the cli argument was really a number
        if (input[i] < '0' || input[i] > '9')
        {
            return 1;
        }
    }

    // argv[0] is always the name of the program
    int key = (int) atoi(argv[1]);

    // Gets the plaintext and begin the translation
    string plaintext = get_string("plaintext: ");
    printf("ciphertext: ");
    for (int i = 0, n = strlen(plaintext); i < n; i++)
    {
        // Checks if it's a letter
        if (plaintext[i] >= 'A' && plaintext[i] <= 'Z')
        {
            // Formula for uppercase letters
            char cipherletter = (char)((int) plaintext[i] - (int) 'A' + key) % ((int) 'Z' - (int) 'A' + 1) + (int) 'A';
            printf("%c", cipherletter);
        }
        else if (plaintext[i] >= 'a' && plaintext[i] <= 'z')
        {
            // Formula for lower case letters
            char cipherletter = (char)((int) plaintext[i] - (int) 'a' + key) % ((int) 'z' - (int) 'a' + 1) + (int) 'a';
            printf("%c", cipherletter);
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