import os
import cherrypy
import configparser
import sqlite3

path = os.path.abspath(os.path.dirname(__file__))  #основная директория 

class WebApp:
  @cherrypy.expose
  def index(self): 
    raise cherrypy.HTTPRedirect('/DataBase')

#возвращает имена таблиц из БД  
  @cherrypy.expose
  def tableNames(self):
    sq=sqlite3.connect('DataBase.db') 
    cursor=sq.cursor()
    cursor.execute("select name from sqlite_master where type='table'")
    tab_name=cursor.fetchall()
    tab_name=[tab_name[x][0] for x in range(len(tab_name))]
    #sq.close()
    return str(tab_name).encode('utf-8')

#принимает из ajax запроса имя таблицы и возвращает её содержимое
  @cherrypy.expose
  def fromTable(self,**tName):  
      sq=sqlite3.connect('DataBase.db') 
      cursor=sq.cursor()
      tabName=""
      for key in tName.keys():
        tabName=key
      cursor.execute(f'select * from {tabName}')
      res=cursor.fetchall()
      return str(res).encode('utf-8')

#изменяет данные в БД
  @cherrypy.expose
  def updateTable(self,**updateArray):
    sq=sqlite3.connect('DataBase.db') 
    cursor=sq.cursor()
    tableName=updateArray.get("listForUpdateTable[]")
    updateArray.pop('listForUpdateTable[]')
    for row in updateArray:
      rowTab=int(updateArray.get(row)[0])+1
      colTab=int(updateArray.get(row)[1])
      valTab=updateArray.get(row)[2]
      cursor.execute(f"PRAGMA table_info({tableName})")
      res=cursor.fetchall()
      columnName=str(res[colTab][1]).encode('utf-8')
      columnName=columnName.decode(encoding="utf-8")
      query=f"UPDATE {tableName} SET '{columnName}' = '{valTab}' WHERE rowid = {rowTab}"
      cursor.execute(query)
      sq.commit()

def main():
  config=configparser.ConfigParser()
  config.read('settings.ini')
  cherrypy.quickstart(WebApp(), '/', {'global' : {
  'server.socket_host' : config['Server']['host'],
  'server.socket_port' : int(config['Server']['port']),
  'tools.staticdir.root' : path}, 
  '/DataBase': {    
  'tools.staticdir.on'    : True,
  'tools.staticdir.dir'   : 'static',  
  'tools.staticdir.index' : 'index.html'
          }
        } 
      )

if __name__ == '__main__':
  main()
