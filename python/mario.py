import cs50

n = 0
while True:
    n = cs50.get_int("Height: ")
    if n >= 1 and n <= 8:
        break

for i in range(1, n + 1):
    print(("#"*i).rjust(n) + "  " + ("#"*i))