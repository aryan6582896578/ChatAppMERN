# This is a comment to test comment coloring

def example_function(param1, param2):
    result = param1 + param2
    print(f"The result is: {result}")
    return result

class ExampleClass:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"Hello, {self.name}! \n{}")

lambda_function = lambda x: x * 2

dictionary = {
    "key1": "value1",
    "key2": 42,
    "method": lambda: "Method called"
}

list_numbers = [1, 2, 3, 4]
mapped_list = [num * 2 for num in list_numbers]

if __name__ == "__main__":
    obj = ExampleClass("Alice")
    obj.greet()
    example_function(10, 20)
