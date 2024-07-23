from pandas import DataFrame


async def get_gene_count(df: DataFrame):
    gene_count = df["gene"].value_counts()
    gene_count_dict = gene_count.to_dict()
    return gene_count_dict
