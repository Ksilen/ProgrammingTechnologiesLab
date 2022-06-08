# Лабораторная работа №5. GIT

1.  **git init** - создаем локальный репозиторий


2.  **copy C:\Users\user\Pictures\pic\sand.jpg**

    **copy C:\Users\user\Pictures\pic\water.jpg**  - добавляем два файла


3. **type nul > .gitignore**             - создаем .gitignore

    **echo *sand.jpg >>.gitignore** - добавляем игнорироваие sand.jpg


4. **git add .**      

    **git commit -m"created gitignore"**        - фиксируем изменения


5. **rename water.jpg lake.jpg**                   - переименовываем файл

    **git add .**
    
    **git commit -m"rename water to lake"**  - фиксируем изменения


6. **git branch Branch1**                                          -создаем ветку Branch1

    **git branch Branch2**                                         -создаем ветку Branch2
    
    **git switch Branch1**                                         -ставим Head на Branch1
    
    **copy C:\Users\user\Pictures\pic\WLogo.jpg**                  -добавляем WLogo.jpg в Branch1
    
    **type nul > text.txt**                                        -добавляем text.txt в Branch1
    
    **echo Hello world! >> text.txt**
    
    **git add .**
    
    **git commit -m"add Wlogo and text"**                          - фиксируем изменения
    
    **git switch master**                                          -ставим Head на master
    
    **git merge Branch1**                                          -слияние  Branch1 в master


7. **git push -u origin --all**                                     -отправить в удаленный репозиторий


8. **git clone https://github.com/Ksilen/ForLab5**   -копируем удаленный репозиторий в папку, отличную от оригинальной

    переходим в оригинальный
    
    **git push origin -d Branch1**  - удаляем ветку Branch1 из удаленного репозитория
    
    **git branch -d Branch1**         - и локального


9. **git switch Branch2**                         - переходим в Branch2

    **echo "Hello world!" > text.txt**        - добавляем "Hello world!" в text.txt
    
    **git add.**
    
    **git commit -m"text in Branch2"**
    
    **git switch main**                              - переходим в main
    
    **git merge Branch2**                         - пытаемся слить ветки и получаем сообщение о конфликте
    
    
Auto-merging text.txt

CONFLICT (add/add): Merge conflict in text.txt

Automatic merge failed; fix conflicts and then commit the result.


   Открыв файл text.txt увидим:
   
<<<<<<< HEAD

Hello world!

/=======

" Hello world!"

/>>>>>>> Branch2


10. Можно отредактировать файл, сделать коммит и конфликт будет устранен

      **git add .**

      **git commit -m "merge"** 
     
     
11. https://github.com/Ksilen/ForLab5



```python

```
