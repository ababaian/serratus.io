import csv
import json

csvfile = open('cov3ma.sumzer.tsv', 'r')
jsonfile = open('../../src/components/Explorer/data/cov3ma.genbank.json', 'w')

if __name__ == '__main__':
    reader = csv.reader(csvfile, delimiter='\t')
    column_names = ['genbank', 'count', 'title', 'family']
    data = {row[0]: {'count': int(row[1]), 'title': row[2], 'family': row[3]}
            for row in reader}
    json.dump(data, jsonfile)
    jsonfile.write('\n')
