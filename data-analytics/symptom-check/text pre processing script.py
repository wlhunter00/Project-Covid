import numpy as np 
import re
import nltk
from nltk.corpus import stopwords
import nltk
from sklearn.feature_extraction.text import CountVectorizer
try:
    STOPWORDS=list(stopwords.words('english'))
except:
    print("nltk not completely donloaded")
    nltk.download("popular")
STOPWORDS=list(stopwords.words('english'))



REPLACE_BY_SPACE_RE = re.compile('[/(){}\[\]\|,;]^a-zA-Z#')
BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')

def remove_pattern(input_txt, pattern):
    r = re.findall(pattern, input_txt)
    for i in r:
        input_txt = re.sub(i, '', input_txt)
        
    return input_txt    
  
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
    text = ' '.join([word for word in text.split() if word not in STOPWORDS]) # delete stopwords from text
    #print(text)
    # text = ' '.join([word for word in text.split() if len(word)> 3]) # delete short words
    # text = ' '.join([word.replace("#",'') for word in text.split() if len(word)> 3])
    

    return(text)


def text_cleaner(df,text_col,min_df,min_len):

    df[text_col] = df[text_col].apply(lambda x:clean_sent(x))

    cv = CountVectorizer(min_df=min_df)
    cv.fit(df[text_col].values)
    cv_all = CountVectorizer(min_df=0)
    cv_all.fit(df[text_col].values)
    vocab = list(cv.vocabulary_.keys())
    vocab_all = list(cv_all.vocabulary_.keys())
    excluded = list(set(vocab_all)-set(vocab))

    df[text_col] = df[text_col].apply(lambda x:' '.join([word for word in x.split() if word not in excluded]))
    df["text_length"] = df["text_length"].apply(lambda x:len(x.split()))
    df = df.loc[df["text_length"]>min_len,:]
    df.drop("text_length",axis=1,inplace=True)
    return(df,vocab)