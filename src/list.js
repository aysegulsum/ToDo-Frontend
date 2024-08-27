// src/list.js
import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

// renderRow işlevi
function renderRow(props) {
    const { index, style, data } = props;
    const { items, onSelectCategory } = data; // itemData'dan onSelectCategory'yi alıyoruz
    const category = items[index];

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={() => onSelectCategory(category)}>
                <ListItemText primary={category.name} />
            </ListItemButton>
        </ListItem>
    );
}

// VirtualizedList
export default function VirtualizedList({ categories, onSelectCategory }) {
    return (
        <Box
            sx={{ width: '100%', height: 550, maxWidth: 250 , padding: 2}}
        >
            <h2 className={"category-header"}>CATEGORIES</h2>
            <FixedSizeList
                height={450}
                width={250}
                itemSize={46}
                itemCount={categories.length}
                overscanCount={5}
                itemData={{ items: categories, onSelectCategory }} // onSelectCategory'yi itemData'ya ekleyin
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}
