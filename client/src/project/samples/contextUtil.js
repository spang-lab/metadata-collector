const processSamples = (sampleData, columnData) => {
    if (!sampleData || !columnData) {
        return {
            columns: [],
            addableColumns: [],
            samples: [],
        };
    }
    const { addableColumns } = columnData;

    const samples = [];

    let columns = columnData.existing.map((column) => {
        const { data } = column;
        const { options } = data;
        return {
            ...column,
            values: new Set(options),
        };
    });
    columns = columns.sort((c1, c2) => {
        if (!c1.data || !c2.data) {
            return 0;
        }
        const sp1 = parseInt(c1.data.sortPriority || '0', 10);
        const sp2 = parseInt(c2.data.sortPriority || '0', 10);
        return sp2 - sp1;
    });

    sampleData.forEach((sample) => {
        const { properties } = sample;
        columns.forEach((column) => {
            const { key, values } = column;
            const property = properties[key];
            if (!property || !property.value) {
                return;
            }
            const { value } = property;
            values.add(value);
        });
    });

    columns = columns.map((c) => {
        const values = Array.from(c.values);
        const size = values.reduce((acc, v) => Math.max(acc, v.length), 0);
        return {
            ...c,
            values,
            size,
        };
    });

    sampleData.forEach((sample) => {
        const { id, owner, properties } = sample;

        const cells = columns.map((column) => ({
            sample: id,
            column,
            data: properties[column.key] || {},
        }));
        samples.push({
            id,
            owner,
            cells,
        });
    });

    return {
        columns,
        addableColumns,
        samples,
    };
};

export default processSamples;
