import re

def main():
    # The user must type only numbers at least
    while True:
        credit = input("Number: ")
        pattern = "[0-9]"

        if re.match(pattern, credit):
            break

    checksum = get_checksum(credit)
    print_result(credit, checksum)


def print_result(credit, checksum):
    # Checking all the conditions until we find a card that matches the pattern
    if checksum % 10 != 0:
        print("INVALID")
    elif credit[0] == '4' and len(credit) in [13, 16]:
        print("VISA")
    elif int(credit[:2]) >= 51 and int(credit[:2]) <= 55 and len(credit) == 16:
        print("MASTERCARD")
    elif credit[:2] in ['34', '37'] and len(credit) == 15:
        print("AMEX")
    # Print invalid as a base case
    else:
        print("INVALID")


def get_checksum(credit):
    checksum = 0
    # Calculating the checksum
    for k, n in enumerate(map(int, credit[::-1])):
        if k % 2 != 0:
            checksum += sum(map(int, str(n * 2)))
        else:
            checksum += n
    return checksum

if __name__ == "__main__":
    main()