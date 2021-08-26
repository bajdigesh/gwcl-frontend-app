import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import FallBackLoader, { TFallBackLoader } from './FallBackLoader';

export default {
  title: 'Layout/Loader',
  component: FallBackLoader,
} as Meta;

const Template: Story<TFallBackLoader> = args => <FallBackLoader {...args} />;

export const Loader = Template.bind({});
Loader.args = {
  height: 100,
};
