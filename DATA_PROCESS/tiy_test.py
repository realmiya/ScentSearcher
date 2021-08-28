import pandas as pd
import numpy as np
import re
import math
import sys


def top_extract(s):
    top = []
    for i in range (1,len(s)+1):
        if s[i-1].lower() == 'top':
            top.append(s[i])
    return top


def base_extract(s):
    base = []
    for i in range (1,len(s)+1):
        if s[i-1].lower() == 'base':
            base.append(s[i])
    return base


def middle_extract(s):
    middle = []
    for i in range (1,len(s)+1):
        if s[i-1].lower() == 'middle':
            middle.append(s[i])
    return middle


def note_extract(s):
    result = []
    location = ['top', 'middle', 'base']
    for i in range (1,len(s)+1):
        for ll in location:
            if s[i-1].lower() == ll:
                result.append(s[i])
    return result


# 去掉所有notes前面的tag以及top，middle，base
# 如果没有的 设为空 nan
def delete_note_tag(s):
    s = re.split('-1|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20',s)[1]
    if len(s)==0:
        s = np.nan
    return s


def notes_table(ori_data):
    data = ori_data.loc[:, ['title', 'notes_1', 'notes_2', 'notes_3', 'notes_4', 'notes_5',
                            'notes_6', 'notes_7', 'notes_8', 'notes_9', 'notes_10',
                            'notes_11', 'notes_12', 'notes_13', 'notes_14', 'notes_15',
                            'notes_16', 'notes_17', 'notes_18', 'notes_19', 'notes_20']]

    split_data = data
    split_data.fillna('-1', inplace=True)

    for i in range(1, 21):
        split_data['notes_{}'.format(str(i))] = data['notes_{}'.format(str(i))].apply(
            lambda s: delete_note_tag(s))

    note_in_perfume = pd.DataFrame(columns=['perfume_name', 'note_name'])

    rows, cols = data.shape

    # 处理所有的notes 对应好（note与perfume的对应关系
    for row in range(0, rows):
        cur_perfume = split_data['title'][row]
        i = 1
        while i < 21:
            if pd.isnull(data['notes_{}'.format(str(i))][row]):
                i = 21
            else:
                new = pd.DataFrame({'perfume_name': cur_perfume,
                                    'note_name': data['notes_{}'.format(str(i))][row]}, index=[1])
                note_in_perfume = note_in_perfume.append(new, ignore_index=True)
                i += 1

    # 将所有的note 放到集合中，-》得到一张note的表格
    note_list = list(set(note_in_perfume['note_name'].tolist()))
    note_table = pd.DataFrame(note_list, columns=['note_name'])

    note_table.to_csv('nnnnew_note.csv', index=False)
    note_in_perfume.to_csv('note_in_perfume.csv', index=False)



    '''
    data = ori_data['title']
    for i in range(1, 21):
        data['notes_{}'.format(str(i))] = data['notes_{}'.format(str(i))]


    data = ori_data
    split_data = data
    split_data.fillna('-1', inplace=True)
    for i in range(1, 21):
        split_data['notes_{}'.format(str(i))] = data['notes_{}'.format(str(i))].apply(
            lambda s: re.split('-1|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20', s))

    notes = split_data['notes_1']
    for i in range(2, 21):
        notes = notes + split_data['notes_{}'.format(str(i))]

    notes = notes.apply(lambda s: list(filter(lambda x: x != '', s)))

    # 提取了所有的的notes-》整合到一列里面
    test_notes = notes.apply(note_extract)

    #top_notes = notes.apply(top_extract)
    #middle_notes = notes.apply(middle_extract)
    #base_notes = notes.apply(base_extract)
    '''
    return


def perfume_table(original_data):
    rows, cols = original_data.shape

    data = pd.DataFrame(columns=['title', 'brand', 'date', 'image', 'description', 'target'])

    data['title'] = data['title'].astype(np.str)
    data['brand'] = original_data['brand']
    data['date'] = original_data['date']
    data['image'] = data['image'].astype(np.str)
    data['description'] = data['description'].astype(np.str)
    data['target'] = 0

    # perfume_name, brand, date, image, description, target
    # 处理title 去掉所有的for women/men 对应到target里面
    target_dict = {'for women': 0,
                   'for men': 1,
                   'for women and men': 2}

    for r in range(0, rows):
        item = original_data['title'][r]
        if 'for men' in item:
            tt = target_dict['for men']
            title = item[0:(item.find('for') - 1)]
            data.loc[r, 'title'] = title
        elif 'for women' in item:
            if 'for women and men' in item:
                tt = target_dict['for women and men']
            else:
                tt = target_dict['for women']
            title = item[0:(item.find('for') - 1)]
            data.loc[r, 'title'] = title
        else:
            tt = 3
            data.loc[r, 'title'] = title
        data.loc[r, 'target'] = tt

    data['target'] = data['target'].astype(dtype=int)
    data.rename(columns={'title': 'perfume_name'}, inplace=True)

    data.to_csv('nnnnew_perfume.csv', index = False)

    return


# 将csv数据全部变成sql 的insert语句
def insert_perfume_data_into_sql():
    pp_index = pd.read_csv('/Users/woody/UNSW-MIT/21T2-COMP9900/pp_index.csv')
    pp_df = pp_index[['Unnamed: 0', 'perfume_name', 'brand', 'date', 'target']]

    d = pp_df.values.tolist()

    k_list = [0, 10000, 20000, 30000, 40000, 51212]
    k = 0
    while k in range(0, 5):
        k_1 = k_list[k]
        k_2 = k_list[k + 1]
        result = 'INSERT INTO ttperfume(ttperfume_id, ttperfume_name, ttbrand, ttdate, tttarget) VALUES'

        i = k_1
        while i in range(k_1, k_2):
            if pd.isna(d[i][1]):
                d[i][1] = d[i][2]
            if "'" in d[i][1]:
                d[i][1] = d[i][1].replace("'", "''")
            if "'" in d[i][2]:
                d[i][2] = d[i][2].replace("'", "''")
            if i != k_2 - 1:
                dd = '(' + str(d[i][0]) + ", '" + str(d[i][1]) + "', '" + str(d[i][2]) + "', " + str(
                    d[i][3]) + ", " + str(d[i][4]) + '),'
            else:
                dd = '(' + str(d[i][0]) + ", '" + str(d[i][1]) + "', '" + str(d[i][2]) + "', " + str(
                    d[i][3]) + ", " + str(d[i][4]) + ');'

            result = result + dd
            i += 1
        # result = result.replace('"',"'",10086)

        name = 'ttttpp_index_' + str(k_1) + '_' + str(k_2) + 'k.txt'
        fh = open(name, 'w')
        fh.write(result)
        fh.close()
        k += 1

    return


# note_in_perfume 处理
# 去重 -》 将csv变成insert语句（str）
def process_n_in_p():

    note_df = pd.read_csv('/Users/woody/UNSW-MIT/21T2-COMP9900/note_index.csv')
    nn = note_df.set_index('note_name')
    note_dic = nn.to_dict()['Unnamed: 0']

    # key: perfume_name     value:perfume_id
    pp1 = pd.read_csv('/Users/woody/UNSW-MIT/21T2-COMP9900/perfume_for_index.csv')
    pp12 = pp1.set_index('title')
    pp_dic = pp12.to_dict()['Unnamed: 0']

    # key: perfume_id     value:perfume_name 用于检验用的
    pp22 = pp1.set_index('Unnamed: 0')
    p2_dic = pp22.to_dict()['title']

    n_in_p = pd.read_csv('/Users/woody/UNSW-MIT/21T2-COMP9900/note_in_perfume.csv')

    np_index = pd.DataFrame(columns=['perfume_id', 'note_id'])

    for r in range(0, n_in_p.shape[0]):
        pp = n_in_p['perfume_name'][r]
        nn = n_in_p['note_name'][r]
        pi = pp_dic[pp]
        ni = note_dic[nn]
        # 重要！！先创建一个DataFrame，用来增加进数据框的最后一行
        new = pd.DataFrame({'perfume_id': pi,
                            'note_id': ni},
                           index=[1])  # 自定义索引为：1 ，这里也可以不设置index

        np_index = np_index.append(new, ignore_index=True)

    #将csv进行保存
    np_index.to_csv('np_index.csv')


    # 如果是同一个p——id 就加到同一个list里面
    # 如果pid变化，前一个list-》set 然后全部加到txt里面


    ex_p = np_index['perfume_id'][0]
    ex_n = np_index['note_id'][0]
    cur_pn_list = [ex_n]


    nn_pp = pd.DataFrame(columns=['perfume_id', 'note_id'])
    for r in range(1, np_index.shape[0]):
        # for r in range(1,30):
        cur_p = np_index['perfume_id'][r]
        cur_n = np_index['note_id'][r]

        if ex_p == cur_p:
            cur_pn_list.append(cur_n)

        else:
            aset = list(set(cur_pn_list))
            cur_pn_list = [cur_n]
            # print(ex_p)
            # print(aset)
            for ni in aset:
                new = pd.DataFrame({'perfume_id': ex_p, 'note_id': ni}, index=[1])

                nn_pp = nn_pp.append(new, ignore_index=True)

        ex_p = cur_p

    nn_pp.to_csv('nn_pp.csv')

    np_list = nn_pp.values.tolist()

    for k1 in range(0, len(np_list), 50000):
        k2 = k1 + 50000
        result = 'INSERT INTO note_in_perfume(perfume_id, note_id) VALUES'

        for i in range(k1, k2):
            le = len(str(np_list[i]))
            q = '(' + str(np_list[i])[1:le - 1] + ')'
            result = result + q
            if i != k2 - 1:
                result = result + ','
            else:
                result = result + ';'

        name = '50nip_' + str(k1 / 10000) + '_' + str(k2 / 10000) + 'w.txt'
        fh = open(name, 'w')
        fh.write(result)
        fh.close()

    k1 = 350000
    k2 = len(np_list)
    result = 'INSERT INTO note_in_perfume(perfume_id, note_id) VALUES'

    for i in range(k1, k2):
        le = len(str(np_list[i]))
        q = '(' + str(np_list[i])[1:le - 1] + ')'
        result = result + q
        if i != k2 - 1:
            result = result + ','
        else:
            result = result + ';'

    name = '50nip_' + str(k1 / 10000) + '_' + str(k2 / 10000) + 'w.txt'
    fh = open(name, 'w')
    fh.write(result)
    fh.close()

    return


if __name__ == '__main__':
    operation = sys.argv[1]
    original_perfume = pd.read_csv('perfume.csv')



    ###########################
    # 处理notes表
    if operation == 'notes_table':
        notes_table(original_perfume)

    if operation == 'perfume_table':
        perfume_table(original_perfume)


