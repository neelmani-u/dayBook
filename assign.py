# 1. To Count Vowels in a String
##############################################################
string = str(input("Enter any String : "))
vowel = 0
for ch in string:
    if (ch == "a" or ch == "e" or ch == "i" or ch == "o" or ch == "u"):
        vowel += 1

print("Number of Vowels - ", vowel)



# 2. To Calculate the no. of words and characters
##############################################################
string = str(input("Enter any String : "))
char = 0
word = 1
for i in string:
    char += 1
    if(i==' '):
        word += 1
print("Number of words in the string : ", word)
print("Number of characters in the string : ", char)



# 3. To print the length of longest word in a list
##############################################################
wordList = []
n = int(input("Enter the no. of word which you want to Enter : "))
for i in range(n):
    word = str(input("Enter the Word : "))
    wordList.append(word)

temp = 0
for wd in wordList:
    if (len(wd) > temp):
        temp = len(wd)
print("Length of Longest word : ", temp)



# 4. To Display Calender
##############################################################
import calender
yy = 2022
mm = 1
print(calender.month(yy, mm))



# 5. To Display Current Time
##############################################################
import datetime
now = datetime.datetime.now()
print("Current Time : ", now)















