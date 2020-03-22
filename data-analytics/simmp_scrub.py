import nltk
from nltk.stem import *
from nltk import tokenize
from nltk.corpus import wordnet as wn
import re

nltk.download('stopwords')
nltk.download('punkt')

usertext = "I haven't slept much the past few days. I have a fever and can't stop coughing. I traveled to my home in New York from South Korea and have been sick ever since."

def symptom_match(usertext):

    stemmer = SnowballStemmer("english", ignore_stopwords=True)


    symptoms = ["fever", "cough", "sneeze", "shortness of breath", "breathing problem",
    "runny nose", "fatigue", "exposure", "muscle pain", "headache", "body ache", "lungs", "dehydrated",
     "dry throat", "dry cough", "droplets", "viral", "eyes", "nose", "mouth", "viral shedding", "incubation",
     "infect", "upper respiratory tract", "immune response", "immunocompromised", "social isolation", "social distancing",
     "ICU", "ventilator", "difficulty breathing", "difficulty arrousing", "confusion", "blue lips", "China", "Italy", "Iran",
     "South Korea", "France", "Spain", "Germany", "Switzerland", "transmission", "spread", "travel", "travel ban"
                , "body ache", "Europe", "airport", "Washington", "public", "New York", "California", "state of emergency"]

    corpusdict= {}
    for eachword in symptoms:
        corpusdict[eachword]= stemmer.stem(eachword)

    userdict = {}
    userinput = tokenize.word_tokenize(usertext)
    for eachword in userinput:
        userdict[eachword] = stemmer.stem(eachword)

    newlist =[]
    for humanword in userdict.values():
        for symptom in corpusdict.values():
            if humanword == symptom:
                newlist.append(humanword)
            elif (humanword[-1] + " " + humanword) == symptom:
                newlist.append(humanword[-1] + " " + humanword)

    print(userdict)
    print(newlist)

symptom_match(usertext)


# """
# Stuff below is in progress
# """
#
# #function below creates bigrams based on a tokenized list from user input
#
# def all_bigrams(tokens):
#     def bigram_at(tokens, i):
#     # Takes a list of tokens and an index i and returns the bigram at that index
#         return (tokens[i], tokens[i+1])
#     big = []
#     for i in range(len(tokens)-1):
#         big.append(bigram_at(tokens, i))
#     return big
#
# user_bigrams = all_bigrams(tokenize.word_tokenize(usertext))
#
# for gram in user_bigrams:
#
# print(user_bigrams)
