/* eslint-disable no-use-before-define */
export interface LayoutCard {
  layout: LayoutComponent;
  option?: LayoutOption;
}

export type LayoutComponent =
  | Button
  | Div
  | Divider
  | DeleteButton
  | EditButton
  | H2
  | H3
  | H4
  | H5
  | H6
  | P
  | Span
  | Chip
  | Droppable
  | Draggable
  | Mime
  | Recursion
  | Text
  | EditableDiv
  | EditableSpan;

export interface LayoutBaseComponent {
  component: string;
  class?: string;
  option?: LayoutOption;
}

export type Button = LayoutBaseComponent & {
  component: 'button';
  onClick: {
    type: string;
    id: string;
    script: string;
  };
  contents: LayoutComponent[];
};

export type DeleteButton = LayoutBaseComponent & {
  component: 'delete-button';
  references: string[];
};

export type EditButton = LayoutBaseComponent & {
  component: 'edit-button';
};

export type Div = LayoutBaseComponent & {
  component: 'div';
  contents: LayoutComponent[];
};

export type Divider = LayoutBaseComponent & {
  component: 'divider';
};

export type H2 = LayoutBaseComponent & {
  component: 'h2';
  contents: LayoutComponent[];
};

export type H3 = LayoutBaseComponent & {
  component: 'h3';
  contents: LayoutComponent[];
};

export type H4 = LayoutBaseComponent & {
  component: 'h4';
  contents: LayoutComponent[];
};

export type H5 = LayoutBaseComponent & {
  component: 'h5';
  contents: LayoutComponent[];
};

export type H6 = LayoutBaseComponent & {
  component: 'h6';
  contents: LayoutComponent[];
};

export type Mime = LayoutBaseComponent & {
  component: 'mime';
  mime: string;
  text: string;
};

export type P = LayoutBaseComponent & {
  component: 'p';
  contents: LayoutComponent[];
};

export type Span = LayoutBaseComponent & {
  component: 'span';
  contents: LayoutComponent[];
};

export type Chip = LayoutBaseComponent & {
  component: 'chip';
  key: string;
  value?: string;
};

export type Droppable = LayoutBaseComponent & {
  component: 'droppable';
  droppableId: string;
  type: string;
  contents: LayoutComponent[];
};

export type Draggable = LayoutBaseComponent & {
  component: 'draggable';
  contents: LayoutComponent[];
};

export type Recursion = LayoutBaseComponent & {
  component: 'recursion';
  contents: LayoutComponent[];
};

export type Text = string;

export type EditableDiv = LayoutBaseComponent & {
  component: 'editable';
  element: 'div';
  inputs: FormDivComponent[];
  outputs: LayoutComponent[];
};

export type EditableSpan = LayoutBaseComponent & {
  component: 'editable';
  element: 'span';
  inputs: FormSpanComponent[];
  outputs: LayoutComponent[];
};

export type FormDivComponent =
  | DivInForm
  | H2InForm
  | H3InForm
  | H4InForm
  | H5InForm
  | H6InForm
  | Mime
  | PInForm
  | SpanInForm
  | Text
  | Chip
  | Input
  | DataList
  | Select
  | Textarea
  | Label;

export type FormSpanComponent =
  | SpanInForm
  | Chip
  | Mime
  | Text
  | Input
  | Select
  | Textarea
  | Label;

export type DivInForm = LayoutBaseComponent & {
  component: 'div';
  contents: FormDivComponent[];
};

export type DividerInForm = LayoutBaseComponent & {
  component: 'divider';
};

export type H2InForm = LayoutBaseComponent & {
  component: 'h2';
  contents: FormDivComponent[];
};

export type H3InForm = LayoutBaseComponent & {
  component: 'h3';
  contents: FormDivComponent[];
};

export type H4InForm = LayoutBaseComponent & {
  component: 'h4';
  contents: FormDivComponent[];
};

export type H5InForm = LayoutBaseComponent & {
  component: 'h5';
  contents: FormDivComponent[];
};

export type H6InForm = LayoutBaseComponent & {
  component: 'h6';
  contents: FormDivComponent[];
};

export type PInForm = LayoutBaseComponent & {
  component: 'p';
  contents: FormDivComponent[];
};

export type SpanInForm = LayoutBaseComponent & {
  component: 'span';
  contents: FormDivComponent[];
};

export type Reference = string;

export type Input =
  | InputCheckbox
  | InputColor
  | InputDate
  | InputDateTimeLocal
  | InputEmail
  | InputFile
  | InputHidden
  | InputImage
  | InputMonth
  | InputNumber
  | InputPassword
  | InputRadio
  | InputRange
  | InputReset
  | InputSearch
  | InputSubmit
  | InputTel
  | InputText
  | InputTime
  | InputUrl
  | InputWeek;

// InputButton は必要性がないので、実装しない。

export type InputCheckbox = LayoutBaseComponent & {
  component: 'input';
  type: 'checkbox';
  id: string;
  name: string;
  checked: string;
  value: string;
};

export type InputColor = LayoutBaseComponent & {
  component: 'input';
  type: 'color';
  id: string;
  name: string;
  reference: Reference;
};

export type InputDate = LayoutBaseComponent & {
  component: 'input';
  type: 'date';
  id: string;
  name: string;
  reference: Reference;
  min?: string;
  max?: string;
  step?: number;
};

export type InputDateTimeLocal = LayoutBaseComponent & {
  component: 'input';
  type: 'datetime-local';
  id: string;
  name: string;
  reference: Reference;
  min?: string;
  max?: string;
  step?: number;
};

export type InputEmail = LayoutBaseComponent & {
  component: 'input';
  type: 'email';
  id: string;
  name: string;
  reference: Reference;
  pattern?: string;
};

export type InputFile = LayoutBaseComponent & {
  component: 'input';
  type: 'file';
  id: string;
  name: string;
  reference: Reference;
  accept?: string;
  multiple?: boolean;
};

export type InputHidden = LayoutBaseComponent & {
  component: 'input';
  type: 'hidden';
  id: string;
  name: string;
  reference: Reference;
};

export type InputImage = LayoutBaseComponent & {
  component: 'input';
  type: 'image';
  id: string;
  name: string;
  reference: Reference;
  alt?: string;
  height?: number;
  width?: number;
};

export type InputMonth = LayoutBaseComponent & {
  component: 'input';
  type: 'month';
  id: string;
  name: string;
  reference: Reference;
  min?: string;
  max?: string;
  step?: number;
};

export type InputNumber = LayoutBaseComponent & {
  component: 'input';
  type: 'number';
  id: string;
  name: string;
  reference: Reference;
  min?: number;
  max?: number;
  step?: number;
};

export type InputPassword = LayoutBaseComponent & {
  component: 'input';
  type: 'password';
  id: string;
  name: string;
  reference: Reference;
  pattern?: string;
};

export type InputRadio = LayoutBaseComponent & {
  component: 'input';
  type: 'radio';
  id: string;
  name: string;
  checked: Reference;
  value: string;
};

export type InputRange = LayoutBaseComponent & {
  component: 'input';
  type: 'range';
  id: string;
  name: string;
  reference: Reference;
  min?: number;
  max?: number;
  step?: number;
};

export type InputReset = LayoutBaseComponent & {
  component: 'input';
  type: 'reset';
  id: string;
  value: string;
};

export type InputSearch = LayoutBaseComponent & {
  component: 'input';
  type: 'search';
  id: string;
  name: string;
  reference: Reference;
  pattern?: string;
};

export type InputSubmit = LayoutBaseComponent & {
  component: 'input';
  type: 'submit';
  id: string;
  value: string;
};

export type InputTel = LayoutBaseComponent & {
  component: 'input';
  type: 'tel';
  id: string;
  name: string;
  reference: Reference;
  pattern?: string;
};

export type InputText = LayoutBaseComponent & {
  component: 'input';
  type: 'text';
  id: string;
  name: string;
  reference: Reference;
  pattern?: string;
};

export type InputTime = LayoutBaseComponent & {
  component: 'input';
  type: 'time';
  id: string;
  name: string;
  reference: Reference;
  min?: string;
  max?: string;
  step?: number;
};

export type InputUrl = LayoutBaseComponent & {
  component: 'input';
  type: 'url';
  id: string;
  name: string;
  reference: Reference;
  pattern?: string;
};

export type InputWeek = LayoutBaseComponent & {
  component: 'input';
  type: 'week';
  id: string;
  name: string;
  reference: Reference;
  min?: string;
  max?: string;
  step?: number;
};

export type DataList = LayoutBaseComponent & {
  component: 'datalist';
  id: string;
  contents: Option[];
};

export type Option = LayoutBaseComponent & {
  component: 'option';
  label: string;
  value: string;
};

export type OptionGroup = LayoutBaseComponent & {
  component: 'optgroup';
  label: string;
  contents: Option[];
};

export type Select = LayoutBaseComponent & {
  component: 'select';
  id: string;
  name: string;
  reference: Reference;
  contents: (Option | OptionGroup)[];
};

export type Textarea = LayoutBaseComponent & {
  component: 'textarea';
  id: string;
  name: string;
  reference: Reference;
  placeholder?: string;
  rows?: number;
  cols?: number;
  wrap?: 'hard' | 'soft' | 'off';
};

export type Label = LayoutBaseComponent & {
  component: 'label';
  for: string;
  contents: FormDivComponent[];
};

export type LayoutOption = {
  [key: string]: string | number | boolean;
};
