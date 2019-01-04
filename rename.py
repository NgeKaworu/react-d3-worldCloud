import os, re
from functools import reduce


def compose2(f, g):
    return lambda *a, **kw: f(g(*a, **kw))


def compose(*fs):
    return reduce(compose2, fs)

def rename(path, ignore):

    fileList = os.listdir(path)

    for file in fileList:

      if file == os.path.basename(__file__) or file in ignore:
        continue

      oldDir = os.path.join(path, file)

      if os.path.isdir(oldDir):
        rename(oldDir, ignore)

      filename, filetype = os.path.splitext(file)

      if (re.match(r'.js[x]*$', filetype)):
        newDir = os.path.join(path, filename + '.tsx')
        os.rename(oldDir, newDir)

if __name__ == '__main__':

    validInput = compose(str.lstrip, str.rstrip, input)

    customPath = validInput('Please input path, if currect please enter: ')

    path = os.getcwd() if customPath == '' else customPath
    # 读取项目下.gitignore文件
    ignore = []

    with open(os.path.join(path, '.gitignore')) as ignore:
        ignore = [i.strip().replace('/', '') for i in ignore.readlines() if not i.strip().startswith('#') and i.strip() != '']

    rename(path, ignore)
