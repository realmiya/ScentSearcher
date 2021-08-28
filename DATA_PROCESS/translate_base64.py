import pandas as pd
import numpy as np
import base64
import csv

def trans_base64(num):
    # 转为二进制格式
    with open("./tupian/{}.png".format(num), "rb") as f:
        base64_data = base64.b64encode(f.read())
    return base64_data


if __name__ == '__main__':

    data = pd.read_csv('pp_pic_des33_header.csv')
    count = 0

    for index, row in data.iterrows():

        p_id = row[0]
        name = row[1]
        list_r = [p_id,name]

        if not pd.isna(row[2]):
            cur_base64_data = trans_base64(p_id)
        else:
            cur_base64_data = ''

        list_r.append(cur_base64_data)
        list_r.append(row[2])

        f1 = open('./pp_pic_des_t64.csv', 'a+', encoding='utf-8', newline='')
        writer1 = csv.writer(f1)
        writer1.writerow(list_r)
        f1.close()

        count += 1
        if count >= 5000 and count%5000==0:
            print('===finish===', count)