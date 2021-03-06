# Задание по варианту
№1. Из списка удалить самую длинную цепочку четных элементов.


Пример: из списка A[8]: 4 1 4 2 1 2 4 6 должен получиться список A[5]: 4 1 4 2 1
(самая длинная цепочка четных чисел включает элементы с 6 по 8: 2 4 6)


# Описание реализации
 Реализация удаления самой длинной цепочки четных элементов из списка содержит 4 функции:
* isNum(arr) - Проверяет являются ли символы числами
* isEmptyA() - Проверяет на наличие данных в поле ввода, и если их нет создает список случайных чисел
* arrWithoutEven(arr) - выводит исходный список и вызывает foo(arr)
* foo(arr) - реализует вычисление самой длинной цепочки четных элементов из списка, удаляет её и выводит результат
 
Сначала вызывается isEmptyA(), которое вызывает функцию input(), и в результате хочет узнать: ввел что-нибудь пользователь или нет.
 Если ввел вызываем isNum(arr), где в тексте ищем все, кроме пробелов,запятых и цифр.
 Если они там есть пишем о недопустимости таких символов и вновь переходим в isEmptyA(), иначе продолжаем и переходим в arrWithoutEven(arr), который показывает что ввели и пишет некоторый текст, после чего вызывает foo(arr).
 
 
 Если же поле ввода оказалось пустым, в isEmptyA() генерируется 10 случайных чисел,которые минуя isNum(arr) (так как числа сгенерированы наверняка верно, и не содержат символов) сразу переходят в arrWithoutEven(arr),который вызывает foo(arr).
 
 В foo() первым делом проверяется поступивший тип данных. Генерируемый тип данных является list, а данные поступившие от пользователя str. Если тип данных str приводим его к списку, удаляя пробелы. 
 
 
 Затем перебирая в цикле список находим четные числа. Если находим впервые(isEven=0) то записываем индекс вхождения в списке, и идем по списку дальше, пока не закончатся четные числа, записывая индекс окончания цепочки четных чисел и её длинну. 
 
 
 Предыдущий процесс повторяется, и если длина новой цепочки больше длины предыдущей, индексы начала(lastFirstIndex) и конца(lastSecondIndex) переписываются, как и максимальная длина цепочки(lastMaxIndex).
 
 По окончании списка проверяется максимальная длина цепочки, и если она больше 0, то есть в ней больше одного элемента, из списка удаляются элементы начиная от "индекса начала" до "индекса конца". После чего отображается новообразованный список.

# Описание возникших затруднений
 
 Очень интерсна в Python реализация метода index(). Почему-то хочется, перебирая список(например слова:"список"), написать:


```python
arr='список'
for i in arr:
    print(arr.index(i))
```

    0
    1
    2
    0
    4
    5
    

И получить индекс элемента со значением. Но не все так посто, index(i),ищет вхождение элемента сначала, о чем не стоит забывать.
 
 Так же порой забывается, что используя метод pop(), удаляется не только элемент списка, но и на то же место встает другой, следующий за ним элемент.  


```python
arr=list('новый список')   
for i in range(0,6):
    #arr.pop(i)
    arr.pop(0)
print(arr)        
```

    ['с', 'п', 'и', 'с', 'о', 'к']
    

# Описание альтернативных способов решения
 В качестве альтернативных способов решения метод  


```python
del arr[lastFirstIndex:lastSecondIndex+1]
```

можно заменить на


```python
for i in range(lastFirstIndex,lastSecondIndex+1):
            arr.pop(lastFirstIndex)
```

а так же функцию 


```python
def isNum(arr):
    if re.search(r'[^, \d]' , arr):
        print("Список содержит недопустимые символы...\n Попробуйте еще раз: ")
        isEmptyA();
    else: arrWithoutEven(arr)   
```

заменить на


```python
def isNum(arr):
    isChar=0
    for j in arr:
        if (j!=',' and j!=' ' and j.isnumeric()==0):
            isChar=1
            print("Список содержит недопустимые символы...\n Попробуйте еще раз: ")
            break
    if isChar==1:        
        isEmptyA()
    else:        
        arrWithoutEven(arr)
```

# Программа



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

    Введите массив чисел или нажмите Enter: 
    
    Исходный cписок:
    [55, 11, 34, 82, 15, 69, 31, 54, 19, 88]
    Список после удаления самой длинной цепочки четных чисел: 
    [55, 11, 15, 69, 31, 54, 19, 88]
    

 
