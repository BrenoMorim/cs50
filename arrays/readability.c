#include <stdio.h>
#include <string.h>
#include <cs50.h>
#include <math.h>
#include <ctype.h>

int main(void)
{
    // Getting the user's prompt
    string text = get_string("Text: ");

    // Setting up the variables
    int letters = 0;
    int words = 0;
    int sentences = 0;

    for (int i = 0, n = strlen(text); i < n; i++)
    {
        // Checks if it's a letter, comparing with chars as ascii integers
        if ((text[i] >= 'A' && text[i] <= 'Z') || (text[i] >= 'a' && text[i] <= 'z'))
        {
            letters++;
        }
        // A space means a new word appeared
        else if (text[i] == ' ')
        {
            words++;
        }
        // A period, exclamation point or question mark means a new sentence is taking place
        else if (text[i] == '.' || text[i] == '?' || text[i] == '!')
        {
            sentences++;
        }
    }
    // We have to add one more to words because there's always one less space than words in sentences
    words++;

    // Calculate the averages
    float L = (float) letters / (float) words * 100;
    float S = (float) sentences / (float) words * 100;

    // Using the formula
    int index = round(0.0588 * L - 0.296 * S - 15.8);

    // Adapting the output
    if (index >= 16)
    {
        printf("Grade 16+\n");
    }
    else if (index < 1)
    {
        printf("Before Grade 1\n");
    }
    else
    {
        printf("Grade %i\n", index);
    }

}