const tcAJAXSaveUserScreenDefinition = [
  `
<tcAJAXSaveUserScreenDefinitionResponse>
  <jobReturn>
    <process>tcAJAXSaveUserScreenDefinition</process>
    <code>0</code>
    <description>The job completed successfully</description>
  </jobReturn>
</tcAJAXSaveUserScreenDefinitionResponse>
`,
  `
<tcAJAXSaveUserScreenDefinitionResponse>
    <jobReturn>
        <process>tcAJAXSaveUserScreenDefinition</process>
        <code>-999</code>
        <description>The job encountered an error</description>
        <messages>
            <errors>
                <error>
                    <code>-999</code>
                    <text>An unknown error has been encountered, please contact an Administrator</text>
                </error>
            </errors>
        </messages>
    </jobReturn>
</tcAJAXSaveUserScreenDefinitionResponse>
`
];

const tcAJAXDeleteUserScreenDefinition = [
  `
<tcAJAXDeleteUserScreenDefinitionResponse>
  <jobReturn>
    <process>tcAJAXDeleteUserScreenDefinition</process>
    <code>0</code>
    <description>The job completed successfully</description>
  </jobReturn>
</tcAJAXDeleteUserScreenDefinitionResponse>
`,
  `
<tcAJAXDeleteUserScreenDefinitionResponse>
    <jobReturn>
        <process>tcAJAXDeleteUserScreenDefinition</process>
        <code>-999</code>
        <description>The job encountered an error</description>
        <messages>
            <errors>
                <error>
                    <code>-999</code>
                    <text>An unknown error has been encountered, please contact an Administrator</text>
                </error>
            </errors>
        </messages>
    </jobReturn>
</tcAJAXDeleteUserScreenDefinitionResponse>
`
];

const tcAJAXGetUserScreenNames = [
  `
<tcAJAXGetUserScreenNamesResponse>
  <userScreens>
    <userScreen>
      <screenName>LKWTQDTE</screenName>
      <screenType>S</screenType>
      <templateScreen>N</templateScreen>
      <langID>en-us</langID>
      <version>0</version>
      <screenDesc>BA WT Queue Date</screenDesc>
      <screenFormat>S</screenFormat>
      <publicLink>N</publicLink>
    </userScreen>
  </userScreens>
  <jobReturn>
    <process>tcAJAXGetUserScreenNames</process>
    <code>0</code>
    <description>The job completed successfully</description>
    <messages/>
  </jobReturn>
</tcAJAXGetUserScreenNamesResponse>
`,
  `
<tcAJAXGetUserScreenNamesResponse>
  <userScreens/>
  <jobReturn>
    <process>tcAJAXGetUserScreenNames</process>
    <code>0</code>
    <description>The job completed successfully</description>
    <messages/>
  </jobReturn>
</tcAJAXGetUserScreenNamesResponse>
`,
  `
<tcAJAXGetUserScreenNamesResponse>
  <userScreens>
    <userScreen>
      <screenName>LKWTQDTE</screenName>
      <screenType>S</screenType>
      <templateScreen>N</templateScreen>
      <langID>en-za</langID>
      <version>0</version>
      <screenDesc>BA WT Queue Date</screenDesc>
      <screenFormat>S</screenFormat>
      <publicLink>N</publicLink>
    </userScreen>
    <userScreen>
      <screenName>LKWTQDTE</screenName>
      <screenType>S</screenType>
      <templateScreen>N</templateScreen>
      <langID>en-us</langID>
      <version>0</version>
      <screenDesc>BA WT Queue Date</screenDesc>
      <screenFormat>S</screenFormat>
      <publicLink>N</publicLink>
    </userScreen>
  </userScreens>
  <jobReturn>
    <process>tcAJAXGetUserScreenNames</process>
    <code>0</code>
    <description>The job completed successfully</description>
    <messages/>
  </jobReturn>
</tcAJAXGetUserScreenNamesResponse>
`
];

const tcAJAXGetUserScreenDefinition = [
  `
<tcAJAXGetUserScreenDefinitionResponse>
  <jobReturn>
    <process>tcAJAXGetUserScreenDefinition</process>
    <code>0</code>
    <description>The job completed successfully</description>
    <messages/>
  </jobReturn>
  <userScreen>
    <screenName>FLDXMPL</screenName>
    <screenType>F</screenType>
    <templateScreen>N</templateScreen>
    <formType>F</formType>
    <langID>en-za</langID>
    <screenFormat>U</screenFormat>
    <screenDesc></screenDesc>
    <screenData>
      <screenDesc></screenDesc>
      <screenFormat>U</screenFormat>
      <version>0</version>
      <screenDefinition definitionVersion="2">
        <title>FOLDER</title>
        <class>dstTheme</class>
        <screenURL/>
        <includeList/>
        <linkList/>
        <customRules/>
        <customProperties/>
        <page index="0">
          <title>FOLDER</title>
          <width>400</width>
          <height>300</height>
          <transformVariables/>
          <dataDictionary>
            <fieldType>select</fieldType>
            <id>businessArea_2</id>
            <name>businessArea</name>
            <sequence/>
            <label>Business Area</label>
            <class/>
            <dataDictionary>UNIT</dataDictionary>
            <externalDataDictionary/>
            <options>
              <row>
                <listValue/>
                <listName/>
              </row>
            </options>
            <rootName/>
            <helpText>Name of business area</helpText>
            <tabIndex>0</tabIndex>
            <required>Y</required>
            <routingList>N</routingList>
            <buttonLabel>Label</buttonLabel>
            <labelPosition/>
            <top>33</top>
            <left>32</left>
            <width>212</width>
          </dataDictionary>
          <dataDictionary>
            <fieldType>select</fieldType>
            <id>folderType_1</id>
            <name>folderType</name>
            <sequence/>
            <label>Folder Type</label>
            <class/>
            <dataDictionary>FOLD</dataDictionary>
            <externalDataDictionary/>
            <options>
              <row>
                <listValue/>
                <listName/>
              </row>
            </options>
            <rootName/>
            <helpText>Name of the folder type</helpText>
            <tabIndex>0</tabIndex>
            <required>Y</required>
            <routingList>N</routingList>
            <buttonLabel>Label</buttonLabel>
            <labelPosition/>
            <top>81</top>
            <left>32</left>
            <width>212</width>
          </dataDictionary>
          <routingButton>
            <id>Update_1</id>
            <name>Update</name>
            <class/>
            <label>Update</label>
            <buttonType>2</buttonType>
            <returnCode>2</returnCode>
            <helpText/>
            <tabIndex>0</tabIndex>
            <top>154</top>
            <left>32</left>
            <width>85</width>
            <height>25</height>
          </routingButton>
          <routingButton>
            <id>Cancel_1</id>
            <name>Cancel</name>
            <class/>
            <label>Cancel</label>
            <buttonType>-1</buttonType>
            <returnCode>-1</returnCode>
            <helpText/>
            <tabIndex>0</tabIndex>
            <top>154</top>
            <left>132</left>
            <width>85</width>
            <height>25</height>
          </routingButton>
        </page>
      </screenDefinition>
    </screenData>
    <publicLink>N</publicLink>
  </userScreen>
</tcAJAXGetUserScreenDefinitionResponse>
`,
  `
<tcAJAXGetUserScreenDefinitionResponse>
    <userScreen>
        <screenName/>
    </userScreen>
    <jobReturn>
        <process>tcAJAXGetUserScreenDefinition</process>
        <code>-999</code>
        <description>The job encountered an error</description>
        <messages>
            <errors>
                <error>
                    <code>-999</code>
                    <text>An unknown error has been encountered, please contact an Administrator</text>
                </error>
            </errors>
        </messages>
    </jobReturn>
</tcAJAXGetUserScreenDefinitionResponse>
`
];

export const data = {
  tcAJAXGetUserScreenDefinition,
  tcAJAXGetUserScreenNames,
  tcAJAXSaveUserScreenDefinition,
  tcAJAXDeleteUserScreenDefinition
}