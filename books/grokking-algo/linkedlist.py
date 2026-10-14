class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

    def __repr__(self):
        return f"Node({self.data})"

class LinkedList:
    def __init__(self):
        self.head = None

    def insertAtBeginning(self, new_data):
        new_node = Node(new_data)
        new_node.next = self.head
        self.head = new_node

    def insertLast(self, new_data):
        new_node = Node(new_data)
        if self.head is None:
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

    def printList(self):
        temp = self.head
        while temp:
            print(temp.data, end = ' ')
            temp = temp.next
        print()

    def deleteHead(self):
        if self.head is None:
            return
        self.head = self.head.next

    def deleteTail(self):
        if self.head is None:
            return
        if self.head.next is None:
            self.head = None
            return
        temp = self.head
        while temp.next.next:
            temp = temp.next 
        temp.next = None

    def search(self, value):
        temp = self.head
        pos = 0
        while temp:
            if temp.data == value:
                return (True, pos)
            temp = temp.next
            pos += 1
        return (False, -1)

llist = LinkedList()
llist.insertAtBeginning(5)
llist.insertAtBeginning(4)
llist.insertAtBeginning(2)
llist.insertAtBeginning(1)

print(llist.search(5))