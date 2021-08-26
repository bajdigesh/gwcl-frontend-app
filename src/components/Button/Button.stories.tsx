import React from 'react';
import Button, { TButtonProps } from './Button';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action, actions } from '@storybook/addon-actions';

export default {
  title: 'Form/Button',
  component: Button,
} as Meta;

const Template: Story<TButtonProps> = args => <Button {...args} {...actions('onClick', 'onMouseOver')} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'contained',
  color: 'primary',
  children: 'Primary Button',
};

// Primary.storyName = "primary button";

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'contained',
  color: 'secondary',
  children: 'Secondary Button',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outlined',
  color: 'primary',
  children: 'Outline',
};
