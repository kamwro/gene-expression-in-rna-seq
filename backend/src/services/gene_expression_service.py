from pandas import DataFrame


def get_gene_count(df: DataFrame) -> dict[str, int]:
    """
    Count occurrences of each gene in the DataFrame.

    Args:
        df: DataFrame containing a 'gene' column

    Returns:
        Dictionary mapping gene names to their occurrence counts
    """
    gene_count = df["gene"].value_counts()
    gene_count_dict = gene_count.to_dict()
    return gene_count_dict
