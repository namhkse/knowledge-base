def tower_of_hanoi(n, source, target, auxiliary):
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    # Move n-1 disks from source to auxiliary, using target as auxiliary
    tower_of_hanoi(n - 1, source, auxiliary, target)
    print(f"Move disk {n} from {source} to {target}")
    # Move n-1 disks from auxiliary to target, using source as auxiliary
    tower_of_hanoi(n - 1, auxiliary, target, source)


# Example: Solve for 3 disks
n = 3
tower_of_hanoi(n, "A", "C", "B")

a, c, b
a, b, c
a, c, b