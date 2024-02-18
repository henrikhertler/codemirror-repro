import React, { useCallback, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { bracketMatching } from '@codemirror/language';
import { lintGutter } from '@codemirror/lint';
import { jsonSchema } from 'codemirror-json-schema';
import { JSONSchema7 } from 'json-schema';

export default function Home() {
    const jsonTemplate = `{
  "title": {
    "en": "Title"
  }
}`;
    const [jsonFile, setJsonFile] = useState<string>(jsonTemplate);

    const onChange = useCallback((value: string) => {
        setJsonFile(value);
    }, []);

    const schema: JSONSchema7 = {
        properties: {
            title: {
                description: 'The title of the formular',
                type: ['object', 'string'],
                properties: {
                    de: { type: 'string' },
                    en: { type: 'string' },
                },
                required: ['de'],
            },
        },
        required: ['title'],
    };

    return (
        <Container>
            <Grid container>
                <Grid
                    item
                    xs={6}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>This will be the preview of the changes from codemirror.</Typography>
                    <pre>{jsonFile}</pre>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ height: 1, '& .cm-theme': { height: '100%', overflow: 'hidden' } }}>
                        <CodeMirror
                            value={jsonFile}
                            theme={dracula}
                            indentWithTab
                            extensions={[
                                EditorView.lineWrapping,
                                bracketMatching(),
                                lintGutter(),
                                jsonSchema(schema),
                                /**
                                 * Comment the following line in:
                                 * jsonSchema(schema),
                                 */
                            ]}
                            onChange={onChange}
                            height='100vh'
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
