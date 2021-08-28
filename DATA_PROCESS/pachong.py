import time
import requests
import csv
import os
import random
import json
from hashlib import md5
import pandas as pd
import sys

def make_md5(s, encoding='utf-8'):
    return md5(s.encode(encoding)).hexdigest()


def translate(query):
    appid = '20210712000886146'
    appkey = 'DI_9o0AuzDnm8FwiJAqo'
    from_lang = 'zh'
    to_lang = 'en'

    endpoint = 'http://api.fanyi.baidu.com'
    path = '/api/trans/vip/translate'
    url = endpoint + path

    salt = random.randint(32768, 65536)
    sign = make_md5(appid + query + str(salt) + appkey)

    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    payload = {'appid': appid, 'q': query, 'from': from_lang, 'to': to_lang, 'salt': salt, 'sign': sign}

    r = requests.post(url, params=payload, headers=headers)
    result = r.json()
    dic = eval(json.dumps(result, indent=4, ensure_ascii=False))
    res = '\n'.join([i['dst'] for i in dic['trans_result']])
    return res


def acq_pic(picurl,p_id):
    reponse=requests.get(url=picurl)
    with open('./tupian/{}.png'.format(p_id),'wb')as f:
        f.write(reponse.content)
        f.close()


def collect(word):
    url = f'https://www.nosetime.com/search.php?op=ajax&type=all&word={word}'
    headers = {
        'User-Agent': 'Mozilla/5.0(WindowsNT10.0;Win64;x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/91.0.4472.106Safari/537.36'
    }
    res = requests.get(url=url, headers=headers).json()
    try:
        for li in res['item']['data']:
            itemId = li['id']
            pict = f'https://img.xssdcdn.com/perfume/{itemId}.jpg'
            desc = li['desc']
            break
    except Exception as e:
        print(str(e))
        (pict, desc) = ('', '')
    finally:
        return pict, desc

    
def main():
    data = pd.read_csv('pp_pic_des22.csv', header=None )
    for index, row in data.iterrows():

        '''
        # 结束在哪里，就从哪里开始数字
        if index <= int(num) :
            continue
        '''

        '''
        p_id = row[0]
        name = row[1]
        list_r = []
        list_r.append(p_id)
        list_r.append(name)
        '''


        # 找到所有没有抓取到的
        if not pd.isna(row[2]):
            a = list(row)
            f1 = open('./pp_pic_des33.csv', 'a+', encoding='utf-8', newline='')
            writer1 = csv.writer(f1)
            writer1.writerow(a)
            f1.close()
            #print(name, '----- no this data！---', index)
            continue

        else:
            p_id = row[0]
            name = row[1]
            list_r = []
            list_r.append(p_id)
            list_r.append(name)
            try:
                (pictUrl, descInfo) = collect(name)
                acq_pic(pictUrl, p_id)

                if pictUrl == None :
                    test=1
                    #重复三次来爬
                    while test <= 3:
                        (pictUrl, descInfo) = collect(name)
                        if pictUrl == None:
                            test += 1
                            descInfo = 'NULL'
                            #time.sleep(0.5)
                        else:
                            test = 4
                            descInfo = translate(descInfo)

                # descInfo = 'NULL'
                if descInfo == '' or descInfo == None:
                    descInfo = 'NULL'
                else:
                    descInfo = translate(descInfo)

                list_r.append(pictUrl)
                list_r.append(descInfo)
                f1 = open('./pp_pic_des33.csv', 'a+', encoding='utf-8', newline='')
                writer1 = csv.writer(f1)
                writer1.writerow(list_r)
                f1.close()

            except Exception as e:
                # print(e)
                a = [p_id, name, 'NULL', 'NULL']
                f1 = open('./pp_pic_des33.csv', 'a+', encoding='utf-8', newline='')
                writer1 = csv.writer(f1)
                writer1.writerow(a)
                f1.close()
                print(name, '----- no this data！---', index)
                continue
            print(name, '----- Success！---', index)
            time.sleep(0.5)
    '''
    fun_l='./数据库 第二阶段/perfume_insert'
    ss=os.listdir(fun_l)
    for y in ss:
        aaa=fun_l+'/'+y

        print('正在获取',y,'............')
        with open(aaa,'r',encoding='utf-8')as f:
            content=f.read()
            f.close()
        qqq=content[73:].split('),')
        for i in range(0,len(qqq)+1):
            list_r=[]
            ttt=qqq[i].split(",")
            name=ttt[1][2:-1]
            list_r.append(name)
            try:
                (pictUrl, descInfo) = collect(name)
                acq_pic(pictUrl,name)
                if(descInfo==None):
                    descInfo='NULL'
                else:
                    descInfo = translate(descInfo)
                list_r.append(descInfo)
                f1=open('./简介.csv', 'a+', encoding='utf-8',newline='')
                writer1 = csv.writer(f1)
                writer1.writerow(list_r)
                f1.close()
            except Exception as e:
                #print(e)
                a=['NULL','NULL']
                f1=open('./简介.csv', 'a+', encoding='utf-8',newline='')
                writer1 = csv.writer(f1)
                writer1.writerow(a)
                f1.close()
                continue
            print(name,'爬取成功！')
            time.sleep(0.2)
            if(i==len(qqq)-1):
                break
    '''

if __name__ == "__main__":
    main()
   #main(sys.argv[1])
