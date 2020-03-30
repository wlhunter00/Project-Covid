import nltk
from nltk.stem import *
from nltk import tokenize
from nltk.corpus import wordnet as wn
import re
from nltk.corpus import stopwords
import sys

stopWords = stopwords.words('english')

# user_text = str(sys.argv[1])

usertext = str(sys.argv[1])

# usertext = "I've felt really tired the last few days. I have some congestion, I feel feverish, have difficulty breathing, and can't stop coughing. I traveled to my home in New York from South Korea and have been sick ever since."

symptoms = ["fever", "cough", "shortness of breath",
        "fatigue",  "headache", "aches and pains", "sore throat", "chills",
         "nausea", "nasal congestion", "diarrhea"]

#maybe link this part to some json or list of places with high infection rates
locations = ["china", "italy", "europe", "japan", "iran", "south korea", "france", "spain", "germany", "switzerland", "washington", "new york", "california"]

def symptom_match(usertext, symptoms, locations):

    usertext = usertext.lower()

    stemmer = SnowballStemmer("english", ignore_stopwords=True)

        #function below creates bigrams based on a tokenized list from user input

    def all_bigrams(tokens):
        def bigram_at(tokens, i):
        # Takes a list of tokens and an index i and returns the bigram at that index
            return (tokens[i], tokens[i+1])
        big = []
        for i in range(len(tokens)-1):
            big.append(bigram_at(tokens, i))
        return big

    #change list of tuples (bigrams) back into bigram strings, separated by string s
    def bigram_strings(l,s):
        newlist = []
        if l == []:
            return ""
        else:
            r = l[0][0]+s
            if len(l)>1:
                for i in l[1:]:
                    r = r+i[0]+s
                    newlist.append(r.strip())
                    r = i[0]+s

            return newlist

    user_tokens = tokenize.word_tokenize(usertext)
    user_bigrams = all_bigrams(user_tokens)

    user_bigram_list = bigram_strings(user_bigrams," ") #used to compare against 2 word symptoms or locations

    userinput = tokenize.word_tokenize(usertext)

    corpusdict= {}
    for eachitem in symptoms:
        l = []
        l.append(stemmer.stem(eachitem))
        for inp in userinput:
            if inp not in stopWords:
                if len(inp)>4:
                    if inp in eachitem or eachitem in inp:
                        l.append(inp)
                    if stemmer.stem(inp) in eachitem:
                        l.append(stemmer.stem(inp))

        corpusdict[eachitem]= l

    userdict = {}
    for eachword in userinput:
        userdict[eachword] = stemmer.stem(eachword)

    #this is just to give us the actual symptom name as listed in our symptom list, even though the stems match (used below)
    def get_key(value, d):
        for key, val in d.items():
            if value == val:
                return key

    def get_listkey(value,d):
        for key, val in d.items():
            for listitem in val:
                if listitem == value:
                    return key

    newlist =[]
    for humanword, humanstem in userdict.items():
        for symptomlist in corpusdict.values():
            for symptom in symptomlist:
                if humanword == symptom or humanstem ==symptom:
                    newlist.append(get_listkey(symptom,corpusdict))

#     newlist2 =[]
    for gram in user_bigram_list:
        stemmed = stemmer.stem(gram)
        for symptom in corpusdict.values():
            if stemmed == symptom:
                newlist.append(get_key(symptom,corpusdict))

    newlist3 =[]
    for gram in user_bigram_list:
        for location in locations:
            if gram == location:
                newlist3.append(gram)


    newlist = list(set((newlist)))


#   print(newlist)

    if len(newlist) == 0:
        print("No matches found")
    if len(newlist) > 0:
        print(";".join(newlist) + ";")

symptom_match(usertext, symptoms, locations)
 