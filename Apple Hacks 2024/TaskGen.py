import csv
import random

#Load tasks from csv
task_library = {}

#-----------Function To read Csv file-------------
with open('task.csv', mode = 'r') as file:
    #Read csv file
    reader = csv.DictReader(file)
    for row in reader:
        categoey = row['Category']
        task = row['Task']
        if categoey not in task_library:
            task_library[categoey] = []
        task_library[categoey].append()(task)

#-----------Function To generate task based on focus areas

def generate_task(focus_areas):
    tasks = []
    for area in focus_areas:
        if area in task_library:
            tasks.append(random.choice(task_library[area]))
    return tasks

#---------------User Input--------------------------

focus_areas = input("Enter focus areas(e.g., Mental Health,Physical Health): ").split(", ")

tasks = generate_task(focus_areas)
for task in tasks:
    print(f"Your Task :{task}")