"""

Natural Language processing to give confidence levels to get professional care for the Novel Corona Virus 2019
Author: Simar Kapoor, co: Zach Glabman

"""


import spacy
import numpy as np 
import re
import nltk
from nltk.corpus import stopwords
import nltk
from sklearn.feature_extraction.text import CountVectorizer
try:
    STOPWORDS=list(stopwords.words('english'))
except:
    print("nltk not completely downloaded")
    nltk.download("popular")
STOPWORDS=list(stopwords.words('english'))



REPLACE_BY_SPACE_RE = re.compile('[/(){}\[\]\|,;]^a-zA-Z#')
BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')


contraction_dict = {"ain't": "is not", "aren't": "are not","can't": "cannot", "'cause": "because", "could've": "could have", "couldn't": "could not",
                    "didn't": "did not",  "doesn't": "does not", "don't": "do not", "hadn't": "had not", "hasn't": "has not", "haven't": "have not", 
                    "he'd": "he would","he'll": "he will", "he's": "he is", "how'd": "how did", "how'd'y": "how do you", "how'll": "how will", "how's": "how is",  
                    "I'd": "I would", "I'd've": "I would have", "I'll": "I will", "I'll've": "I will have","I'm": "I am", "I've": "I have", "i'd": "i would", 
                    "i'd've": "i would have", "i'll": "i will",  "i'll've": "i will have","i'm": "i am", "i've": "i have", "isn't": "is not", "it'd": "it would", 
                    "it'd've": "it would have", "it'll": "it will", "it'll've": "it will have","it's": "it is", "let's": "let us", "ma'am": "madam", "mayn't": "may not",
                    "might've": "might have","mightn't": "might not","mightn't've": "might not have", "must've": "must have", "mustn't": "must not", 
                    "mustn't've": "must not have", "needn't": "need not", "needn't've": "need not have","o'clock": "of the clock", "oughtn't": "ought not", 
                    "oughtn't've": "ought not have", "shan't": "shall not", "sha'n't": "shall not", "shan't've": "shall not have", "she'd": "she would", 
                    "she'd've": "she would have", "she'll": "she will", "she'll've": "she will have", "she's": "she is", "should've": "should have", 
                    "shouldn't": "should not", "shouldn't've": "should not have", "so've": "so have","so's": "so as", "this's": "this is","that'd": "that would",
                    "that'd've": "that would have", "that's": "that is", "there'd": "there would", "there'd've": "there would have", "there's": "there is", 
                    "here's": "here is","they'd": "they would", "they'd've": "they would have", "they'll": "they will", "they'll've": "they will have", 
                    "they're": "they are", "they've": "they have", "to've": "to have", "wasn't": "was not", "we'd": "we would", "we'd've": "we would have", 
                    "we'll": "we will", "we'll've": "we will have", "we're": "we are", "we've": "we have", "weren't": "were not", "what'll": "what will", 
                    "what'll've": "what will have", "what're": "what are",  "what's": "what is", "what've": "what have", "when's": "when is", "when've": "when have", 
                    "where'd": "where did", "where's": "where is", "where've": "where have", "who'll": "who will", "who'll've": "who will have", "who's": "who is",
                    "who've": "who have", "why's": "why is", "why've": "why have", "will've": "will have", "won't": "will not", "won't've": "will not have", 
                    "would've": "would have", "wouldn't": "would not", "wouldn't've": "would not have", "y'all": "you all", "y'all'd": "you all would",
                    "y'all'd've": "you all would have","y'all're": "you all are","y'all've": "you all have","you'd": "you would", "you'd've": "you would have", 
                    "you'll": "you will", "you'll've": "you will have", "you're": "you are", "you've": "you have"}

def _get_contractions(contraction_dict):
    contraction_re = re.compile('(%s)' % '|'.join(contraction_dict.keys()))
    return contraction_dict, contraction_re

contractions, contractions_re = _get_contractions(contraction_dict)

def replace_contractions(text):
    def replace(match):
        return contractions[match.group(0)]
    return contractions_re.sub(replace, text)

# Usage
replace_contractions("this's a text with contraction")
    


def clean_sent(text):
    """
        text: a string
        
        return: modified initial string
    """
#     text = # Remove long spaces and combine
#     text = # lowercase text
#     text = # replace REPLACE_BY_SPACE_RE symbols by space in text
#     text = # delete symbols which are in BAD_SYMBOLS_RE from text
#     text = # delete stopwords from text
    REPLACE_BY_SPACE_RE = re.compile('[/(){}\[\]\|,;]^a-zA-Z#')
    BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')

    text = text.replace("\n"," ")
    text = ' '.join(text.split())
    #print(text)
    text = text.lower() # lowercase text
    #print(text)
    # text = ' '.join(word for word in text.split() if not(word.startswith('@')))
    # text = ' '.join(word for word in text.split() if not(word.startswith('http')))
    text = replace_contractions(text)
    text = REPLACE_BY_SPACE_RE.sub(' ', text) # replace REPLACE_BY_SPACE_RE symbols by space in text
    #print(text)
    text = BAD_SYMBOLS_RE.sub('', text) # delete symbols which are in BAD_SYMBOLS_RE from text
    #print(text)
    #print(text)
    text = ' '.join([word for word in text.split() if word not in STOPWORDS]) # delete stopwors from text
    #print(text)
    # text = ' '.join([word for word in text.split() if len(word)> 3]) # delete short words
    # text = ' '.join([word.replace("#",'') for word in text.split() if len(word)> 3])
    

    return(text)


#User entered text user_text
user_text = ""

#Symptoms/Places affected/re;ated medical conditions corpus to find user entered text similarity 

symptoms = ["fever", "cough", "sneeze", "shortness of breath", "breathing problem",  "dry throat", 
"runny nose", "fatigue", "exposure", "muscle pain", "headache", "body ache", "lungs", "dehydrated",
 "dry throat", "dry cough", "droplets", "viral", "eyes", "nose", "mouth", "viral shedding", "incubation",
 "infect", "upper respiratory tract", "immune response", "immunocompromised", "social isolation", "social distancing",
 "ICU", "ventilator", "difficulty breathing", "difficulty arrousing", "confusion", "blue lips", "China", "Italy", "Iran",
 "South Korea", "France", "Spain", "Germany", "Switzerland", "transmission", "spread", "travel", "travelling", "travel ban",
 "coughing", "body ache", "Europe", "airport", "Washington", "public", "New York", "California", "state of emergency"] 


 #Loading en core web md nlp dataset 
 nlp = spacy.load("en_core_web_md")

cosine_arr = []
for i in user_text:
    m = -1
    check = ""
    for j in symptoms:
        check = j
        token1 = nlp(i)
        token2 = nlp(j)
        if m < token1.similarity(token2):
            m = token1.similarity(token2)
            check = j
    cosine_arr.append([m, i, check])

counter = 0
s = 0
for i in cosine_arr:
    if i[0] < 0.3:
        counter += 1
    else:
        s += i[0]

agg = (s/(len(cosine_arr)-counter))*100

print("Confidence level for getting professional care: ", agg)















