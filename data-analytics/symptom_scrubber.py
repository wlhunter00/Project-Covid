import nltk
from nltk.stem import *
from nltk import tokenize
from nltk.corpus import wordnet as wn
import re

usertext = "I haven't slept much the past few days. I have a fever, some muscle pain and difficulty breathing, and can't stop coughing. I traveled to my home in New York from South Korea and have been sick ever since."

symptoms = ["fever", "cough", "sneeze", "breath", "difficulty breathing",
        "runny nose", "fatigue", "exposure", "muscle pain", "headache", "body ache", "lungs", "dehydrated",
         "dry throat", "dry cough", "droplets", "viral", "eyes", "nose", "mouth", "viral shedding", "incubation",
         "infect", "upper respiratory tract", "immune response", "immunocompromised", "social isolation", "social distancing",
         "ICU", "ventilator", "difficulty breathing", "difficulty arrousing", "confusion", "blue lips", "transmission", "spread", "travel", "travel ban"
                    , "body ache", "Europe", "airport", "public", "state of emergency"]

#maybe link this part to some json or list of places with high infection rates
locations = ["china", "italy", "iran", "south korea", "france", "spain", "germany", "switzerland", "washington", "new york", "california"]

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
    
    corpusdict= {}
    for eachitem in symptoms:
        corpusdict[eachitem]= stemmer.stem(eachitem)        

    userdict = {}
    userinput = tokenize.word_tokenize(usertext)
    for eachword in userinput:
        userdict[eachword] = stemmer.stem(eachword)

    #this is just to give us the actual symptom name as listed in our symptom list, even though the stems match (used below)
    def get_key(value, d): 
        for key, val in d.items():
            if value == val:
                return key     
        
    newlist =[]
    for humanword in userdict.values():
        for symptom in corpusdict.values():
            if humanword == symptom:
                newlist.append(get_key(symptom,corpusdict))
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
                    
    if len(newlist) == 0:
        print("From your input, we have not detected any known symptoms directly related to COVID-19. If you didn't before, please list symptoms.")
    if len(newlist) > 0:
        print("From your input, we detected the following known symptom(s) that others have reported:")
        for i, symptom in enumerate(newlist,1):
            print(f'{i}: {symptom}')
    if len(newlist3) == 0:
        print("No problem areas indicated.")
    if len(newlist3) > 0 and len(newlist3) < 3:
        print("Because you've traveled to " + " and ".join(newlist3) + ", it is advised you check in with a medical professional.")
    if len(newlist3) >= 3:
        print("Because you've traveled to " + ", ".join(newlist3) + ", it is advised you check in with a medical professional.")
    
symptom_match(usertext, symptoms, locations)