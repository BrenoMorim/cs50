// Implements a dictionary's functionality
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <strings.h>
#include <ctype.h>
#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

// Number of buckets in hash table
const unsigned int N = 50000;

// Let's keep track of the dictionary size to avoid having to calculate it afterward
unsigned int dict_size = 0;

// Hash table
node *table[50000];

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // Gets the hash code of the string
    int hash_code = hash(word);
    // Access the linked list at that index in hash table
    node *n = table[hash_code];
    // Iterate through the list looking for this word
    while (n != NULL)
    {
        // Using strcasecmp because it's case insensitive
        if (strcasecmp(word, n->word) == 0)
        {
            return true;
        }
        n = n->next;
    }
    // If after all the iteration it wasn't found then it's not in the dictionary
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    // Given a string we can sum the int value of all its characters to get a hash code
    long sum = 0;
    for (int i = 0; i < strlen(word); i++)
    {
        sum += tolower(word[i]);
    }
    // Using the modulo operator to guarantee it respects the size of the hash table
    return sum % N;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // Opens the file
    FILE *dict_pointer = fopen(dictionary, "r");
    // Check if the pointer is null
    if (dictionary == NULL)
    {
        printf("Unable to open %s\n", dictionary);
        return false;
    }
    // Preparing a variable to contain the words
    char next_word[LENGTH + 1];
    // Read strings from each line of the file
    while (fscanf(dict_pointer, "%s", next_word) != EOF)
    {
        // Separates enough space to create a new node
        node *n = malloc(sizeof(node));
        if (n == NULL)
        {
            return false;
        }
        // Copy the word into node using strcopy
        strcpy(n->word, next_word);
        // Hash word to get the hash code
        int hash_code = hash(next_word);

        // Insert node into hash table at that location
        n->next = table[hash_code];
        table[hash_code] = n;
        dict_size++;
    }
    // Close file and return true if everything went well
    fclose(dict_pointer);
    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    // Return the variable we used to keep track of its size
    return dict_size;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    // Iterate over hash table and free nodes in each linked list
    for (int i = 0; i < N; i++)
    {
        // Assign cursor
        node *n = table[i];
        // Iterate through linked list
        while (n != NULL)
        {
            // Make temp equal cursor;
            node *tmp = n;
            // Point cursor to next element
            n = n->next;
            // Free the memory
            free(tmp);
        }
        // If n equals NULL and i equals N - 1 then we have reached the end of the hash table
        if (n == NULL && i == N - 1)
        {
            free(n);
            return true;
        }
    }
    return false;
}
