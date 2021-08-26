import { AsyncThunk } from '@reduxjs/toolkit';

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type TPendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type TRejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type TFulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
