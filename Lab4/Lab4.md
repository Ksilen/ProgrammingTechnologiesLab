   # Лабораторная работа №4. Классы.

# Задание по варианту
Необходимо переделать лабораторную работу №3 с использованием классов, описывающих предметную область, заданную вариантом, с реализацией следующих особенностей (вполне возможно, что предлагаемое в 3 лабе задание для этого нужно будет расширить):

1.  Класс должен содержать итератор

2.  Должна быть реализована перегрузка стандартных операций (repr, например)

3.  Должно быть реализовано наследование

4.  Запись значений в свойства - только через setattr

5.  Возможность доступа к элементам коллекции по индексу (getitem)

6.  Должны быть реализованы статические методы

7.   Должны быть реализованы генераторы


# Описание реализации
 Для реализации задания создано два класса student и ForCSV, оба наследуются от object. Поле student_list класса ForCSV  содержит объекты класса student. 
 
 Класс ForCSV содержит методы: openCSV - читает csv фаил, создает объект класса student, инициализирует его значениями из строк csv файла, и помещает его в student_list.
 saveCSV - сохраняет в csv фаил значения из student_list.
 
 Так же реализован статический метод printHead(), выводящий "шапку" списка, метод printS(self,sortName), принимающий в качестве аргумента поле класса student и сортирующий по нему список, а затем выводящий его. Реализованы методы iter, next и getitem. 
 
 

# Описание возникших затруднений
 
Так и не понял как переопределить итераторы в моей реализации.Пробовал безуспешно итерировать поля класса student. 
Узнал много нового. Различия sort() и sorted(), что такое исключение StopIteration(), что такое декораторы, о переопределении методов родительского класса при помощи super().     
    

# Описание альтернативных способов решения

 Можно использовать библиотеку Pandas и её методы открытия и сохранения csv файла.  

# Программа
```python
from operator import attrgetter
import csv

class student(object):
    def __init__(self,num,name,mail,group):
        self.num=num
        self.name=name
        self.mail=mail
        self.group=group
        
    def __repr__(self):
        li=(str(self.num), self.name, self.mail, str(self.group))
        return repr(list(li))
    
class ForCSV(object):
    student_list=[]         #список с объектами student
    
    def openCSV(self,str):
        with open(str,encoding='utf-8') as f:
            x=0
            row=(i for i in f)                     
            for i in row: 
                if x!=0:
                    st=student('','','','')
                    r=i.split(",")
                    setattr(st,"num",int(r[0]))
                    setattr(st,"name",r[1])
                    setattr(st,"mail",r[2])
                    setattr(st,"group",int(r[3].rstrip()))
                    self.student_list.append(st)
                x+=1
   
    def saveCSV(self,fName):
        with open(fName, 'w', newline='',encoding='utf-8') as csv_file:
            csv_writer = csv.writer(csv_file)
            csv_writer.writerow(('№','ФИО','e-mail','группа'))
            for row in self.student_list:            
                columns = [str(row.num),row.name,row.mail, str(row.group)]
                csv_writer.writerow(columns)
                             
    @staticmethod    
    def printHead():         #выводит шапку списка
        print('{:>2}'.format('№'),'{:>20}'.format('ФИО'),
              '{:>30}'.format('e-mail'),'{:>17}'.format('группа'))
    
    
    def printS(self,sortName):
        self.student_list.sort(key=attrgetter(sortName))  #сортировка списка
        self.printHead()       
        for i in self.student_list:
            print('{:>2}'.format(i.num),'{:>40}'.format(i.name),
                  '{:>21}'.format(i.mail),'{:>2}'.format(i.group))
                
    def __iter__(self):
        return self
        
    def __next__(self):
        while():
            try:
                element = next(iterator)
            except StopIteration:
                break
    
    def __getitem__(self, k):
        return self.student_list[k]
    
    
if __name__ == "__main__":
    di=ForCSV()   
    di.openCSV('data.csv')
    print("Первоначальный список:")
    di.printS('num')
    print("\nОтсортированный по фамилиям:")
    di.printS('name')
    print("\nОтсортированный по e-mail:")
    di.printS('mail')
    print("\nОтсортированный по группам:")
    di.printS('group')
    print('\n')
    print(di[5])
    di.saveCSV('data.csv')


Первоначальный список:
 №                  ФИО                         e-mail            группа
 1                 Селезнева Мария Глебовна  g0orc3x1@outlook.com  1
 2                Сахарова Ева Владимировна       rv7bp@gmail.com  1
 3             Сафонова Мария Александровна        93@outlook.com  3
 4      Кузнецова Александра Константиновна          er@gmail.com  4
 5               Матвеев Николай Тимофеевич        o0my@gmail.com  2
 6               Харитонова Сафия Артёмовна     715qy08@gmail.com  2
 7                  Панкова Алия Богдановна        vubx0t@mail.ru  3
 8               Устинова Малика Богдановна   wnhborq@outlook.com  1
 9            Суханов Василий Александрович          gq@yandex.ru  4
10                Захарова Алиса Алексеевна     ic0pu@outlook.com  1

Отсортированный по фамилиям:
 №                  ФИО                         e-mail            группа
10                Захарова Алиса Алексеевна     ic0pu@outlook.com  1
 4      Кузнецова Александра Константиновна          er@gmail.com  4
 5               Матвеев Николай Тимофеевич        o0my@gmail.com  2
 7                  Панкова Алия Богдановна        vubx0t@mail.ru  3
 3             Сафонова Мария Александровна        93@outlook.com  3
 2                Сахарова Ева Владимировна       rv7bp@gmail.com  1
 1                 Селезнева Мария Глебовна  g0orc3x1@outlook.com  1
 9            Суханов Василий Александрович          gq@yandex.ru  4
 8               Устинова Малика Богдановна   wnhborq@outlook.com  1
 6               Харитонова Сафия Артёмовна     715qy08@gmail.com  2

Отсортированный по e-mail:
 №                  ФИО                         e-mail            группа
 6               Харитонова Сафия Артёмовна     715qy08@gmail.com  2
 3             Сафонова Мария Александровна        93@outlook.com  3
 4      Кузнецова Александра Константиновна          er@gmail.com  4
 1                 Селезнева Мария Глебовна  g0orc3x1@outlook.com  1
 9            Суханов Василий Александрович          gq@yandex.ru  4
10                Захарова Алиса Алексеевна     ic0pu@outlook.com  1
 5               Матвеев Николай Тимофеевич        o0my@gmail.com  2
 2                Сахарова Ева Владимировна       rv7bp@gmail.com  1
 7                  Панкова Алия Богдановна        vubx0t@mail.ru  3
 8               Устинова Малика Богдановна   wnhborq@outlook.com  1

Отсортированный по группам:
 №                  ФИО                         e-mail            группа
 1                 Селезнева Мария Глебовна  g0orc3x1@outlook.com  1
10                Захарова Алиса Алексеевна     ic0pu@outlook.com  1
 2                Сахарова Ева Владимировна       rv7bp@gmail.com  1
 8               Устинова Малика Богдановна   wnhborq@outlook.com  1
 6               Харитонова Сафия Артёмовна     715qy08@gmail.com  2
 5               Матвеев Николай Тимофеевич        o0my@gmail.com  2
 3             Сафонова Мария Александровна        93@outlook.com  3
 7                  Панкова Алия Богдановна        vubx0t@mail.ru  3
 4      Кузнецова Александра Константиновна          er@gmail.com  4
 9            Суханов Василий Александрович          gq@yandex.ru  4


['5', 'Матвеев Николай Тимофеевич', 'o0my@gmail.com', '2']
```



```python

```
