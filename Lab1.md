Из списка удалить самую длинную цепочку четных элементов.
Пример: из списка A[8]: 4 1 4 2 1 2 4 6 должен получиться список A[5]: 4 1 4 2 1
(самая длинная цепочка четных чисел включает элементы с 6 по 8: 2 4 6)


# Требования к отчету
Титульный лист
Задание по варианту
Описание реализации
Описание возникших затруднений
Описание альтернативных способов решения

# Требования к программе
Ввод элементов списка должен быть доступен с клавиатуры и путем автоматической генерации
Программа должна корректно обрабатывать некорректный ввод.
Исходный код должен быть откомментирован
Необходимо реализовать правильную декомпозицию программы на методы.
Необходимо реализовать предложенный алгоритм без использования стандартных функций и с использованием (необходимо реализовать два отдельных метода).


```python
import random as r
import re

def foo(arr):
    if isinstance(arr,str): 
        arr=list(int(i.strip()) for i in re.split(' |,',arr) if i!='')   # Удаляет пробелы, и создает список       
    firstIndex,secondIndex,firstI,secondI=0,0,0,0
    maxIndex,isEven,lastFirstIndex,lastSecondIndex,lastMaxIndex=0,0,0,0,0
    lenArr=len(arr)-1
    for i, val in enumerate(arr):  
        if val%2==0 and i!=lenArr:
            if isEven==0:         #если четное и isEven==0 добавить первый индекс
                firstIndex=i
                isEven=1     
            else:
                secondIndex=i 
        else:
            if i==lenArr and val%2==0 and isEven==1:
                 secondIndex=i               #если последний символ четный 
            isEven=0
            maxIndex=secondIndex-firstIndex
            if maxIndex>lastMaxIndex:
                lastMaxIndex=maxIndex
                lastFirstIndex=firstIndex
                lastSecondIndex=secondIndex
    if lastMaxIndex>0:                        
        del arr[lastFirstIndex:lastSecondIndex+1]
    print(arr)                                                          
    
#Вывод конечного результата        
def arrWithoutEven(arr): 
    print("Исходный cписок:") 
    print(arr)
    print("Список после удаления самой длинной цепочки четных чисел: ") 
    foo(arr)   
          
#Проверяем пустые данные или нет,
#и если пустые забивает random числами     
def isEmptyA():
    arr=input()
    if arr=="": 
        arr=[r.randint(0,100) for arr in range(10)] 
        arrWithoutEven(arr)
    else: isNum(arr)
        
#Проверяет являются ли символы числами               
def isNum(arr):
    if re.search(r'[^, \d]' , arr):
        print("Список содержит недопустимые символы...\n Попробуйте еще раз: ")
        isEmptyA();
    else: arrWithoutEven(arr)
         
#Начало работы программы      
print("Введите массив чисел или нажмите Enter: ")
isEmptyA()

```

 


```python
def arrWithoutEven(arr): 
    print("Исходный cписок:") 
    print(arr)
    print("Список после удаления самой длинной цепочки четных чисел: ") 
    foo(arr)   
          
#Проверяем пустые данные или нет,
#и если пустые забивает random числами     
def isEmptyA():
    arr=input()
    if arr=="": 
        arr=[r.randint(0,100) for arr in range(10)] 
        arrWithoutEven(arr)
    else: isNum(arr)
        
#Проверяет являются ли символы числами               
def isNum(arr):
    if re.search(r'[^, \d]' , arr):
        print("Список содержит недопустимые символы...\n Попробуйте еще раз: ")
        isEmptyA();
    else: arrWithoutEven(arr)
         
#Начало работы программы      
print("Введите массив чисел или нажмите Enter: ")
isEmptyA()
```
