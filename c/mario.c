#include <stdio.h>

// Auxiliar functions declarations
int get_user_input(void);
void build_pyramid(int height);

int main(void)
{
    // Gets the input and builds the pyramid
    int height = get_user_input();
    build_pyramid(height);
}

int get_user_input(void)
{
    // Get a positive integer to represent the height of the staircase
    int height;

    // Keeps asking the height until it gets a valid value
    do
    {
        // Prompts the height
        printf("Height: ");
        scanf("%d", &height);
    }
    while (height < 1 || height > 8);
    return height;
}

void build_pyramid(int height)
{
    // Build each row
    for (int i = 0; i < height; i++)
    {
        // Building the left part
        for (int j = 0; j < height; j++)
        {
            // Inserts the blocks
            if (height - j <= i + 1)
            {
                printf("#");
            }
            // Completes the left part with spaces to align the pyramid to the right
            else
            {
                printf(" ");
            }
        }

        // Separates both parts with 2 spaces
        printf("  ");

        // Building the right part
        for (int j = 0; j <= i; j++)
        {
            // Inserts the number of the current row as blocks
            printf("#");

        }

        printf("\n");
    }
}