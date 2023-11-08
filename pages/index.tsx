/* ██████╗ ██╗████████╗███████╗ █████╗  ██████╗████████╗ ██████╗ ██████╗ ██╗   ██╗
 * ██╔══██╗██║╚══██╔══╝██╔════╝██╔══██╗██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝
 * ██████╔╝██║   ██║   █████╗  ███████║██║        ██║   ██║   ██║██████╔╝ ╚████╔╝
 * ██╔══██╗██║   ██║   ██╔══╝  ██╔══██║██║        ██║   ██║   ██║██╔══██╗  ╚██╔╝
 * ██████╔╝██║   ██║   ██║     ██║  ██║╚██████╗   ██║   ╚██████╔╝██║  ██║   ██║
 * ╚═════╝ ╚═╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝
 *
 *
 * Copyright (c) 2023 Bitfactory GmbH. All rights reserved.
 * https://www.bitfactory.io
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are not permitted.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import React, { useCallback, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { json } from '@codemirror/lang-json';
import { bracketMatching } from '@codemirror/language';
import { lintGutter } from '@codemirror/lint';
import { jsonSchema } from 'codemirror-json-schema';
import { JSONSchema7 } from 'json-schema';

export default function Home() {
    const jsonTemplate = `{
  "title": {
    "en": "Title",
  },
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
                                json(),
                                EditorView.lineWrapping,
                                bracketMatching(),
                                lintGutter(),
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
