export const formatDate = (created: string) => {
    const date = new Date(created);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return formattedDate;
};
