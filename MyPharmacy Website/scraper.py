import requests
from bs4 import BeautifulSoup
from csv import writer

url = "https://genericwala.com/Home/AllGenericMeds?so=List-of-All-Generic-Medicines"
r = requests.get(url)
htmlContent = r.content

soup = BeautifulSoup(htmlContent, 'html.parser')

lists = soup.find_all('td', class_="brand-tb tdItem")
# print(lists)
f = open('data.csv', 'w', encoding='utf8', newline='')
writer = csv.writer(f)
header = ['Name']
writer.writerow(header)

for list in lists:
    names = list.find('tr', class_=['flaticon-medical-11','flaticon-medical-9','flaticon-medical-16']).text
    info = [names]
    # print(info)


















# print(soup.prettify)
# title = soup.title
# print(title)
# print(type(title))
# print(type(soup))
# print(type(title.string))
# print(type(title))

# paras = soup.find_all('a')
# print(soup.find_all("p", class_="categories-all"))