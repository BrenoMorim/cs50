def main():
    text = input("Text: ")

    # After every word we have a space, so the number of spaces = the number of words - 1
    words = text.count(" ") + 1

    # Counts all letters from the text and get the average from the words
    L = len([c for c in text if c.isalpha()]) * 100 / (words)

    # Every sentence ends in . ! ?
    S = (text.count(".") + text.count("?") + text.count("!")) * 100 / (words)

    # Uses the formula
    index = (0.0588 * L) - (0.296 * S) - 15.8

    # Prints the result
    if index >= 16:
        print("Grade 16+")
    elif index < 1:
        print("Before Grade 1")
    else:
        print(f"Grade {round(index)}")

if __name__ == '__main__':
    main()