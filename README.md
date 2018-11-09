# OpenXMLCCodeCompactor
Converts pregenerated OpenXML C# Code to indented format.

>Requires node.js

Put raw code in **docString.txt** and then in cmd/powershell run **node generateDoc.js**.
Output will be in the docString.txt

From This:
```c#
ChartShapeProperties chartShapeProperties1 = new ChartShapeProperties();

A.SolidFill solidFill1 = new A.SolidFill();
A.SchemeColor schemeColor1 = new A.SchemeColor(){ Val = A.SchemeColorValues.Background1 };

solidFill1.Append(schemeColor1);

A.Outline outline1 = new A.Outline(){ Width = 9525, CapType = A.LineCapValues.Flat, CompoundLineType = A.CompoundLineValues.Single, Alignment = A.PenAlignmentValues.Center };
A.NoFill noFill1 = new A.NoFill();
A.Round round1 = new A.Round();

outline1.Append(noFill1);
outline1.Append(round1);
A.EffectList effectList1 = new A.EffectList();

chartShapeProperties1.Append(solidFill1);
chartShapeProperties1.Append(outline1);
chartShapeProperties1.Append(effectList1);
return chartShapeProperties1;
```

To This:
```c#
new ChartShapeProperties(
    new A.SolidFill(
        new A.SchemeColor(){ Val = A.SchemeColorValues.Background1 }
    ),
    new A.Outline(
        new A.NoFill(),
        new A.Round()
    ){ Width = 9525, CapType = A.LineCapValues.Flat, CompoundLineType = A.CompoundLineValues.Single, Alignment = A.PenAlignmentValues.Center },
    new A.EffectList()
)
```
