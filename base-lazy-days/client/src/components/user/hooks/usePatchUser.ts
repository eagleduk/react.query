import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import jsonpatch from 'fast-json-patch';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';
import { useUser } from './useUser';

// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null,
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
    },
  );
  return data.user;
}

// TODO: update type to UseMutateFunction type
export function usePatchUser(): UseMutateFunction<
  User,
  unknown,
  User,
  unknown
> {
  const { user, updateUser } = useUser();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  // TODO: replace with mutate function
  const { mutate: patchUser } = useMutation({
    mutationFn: (newUser: User) => patchUserOnServer(newUser, user),
    onSuccess: (response: User | null) => {
      if (response) {
        // updateUser(response);
        toast({
          title: 'Update User!',
          status: 'success',
        });
      }
    },
    onMutate: (response: User) => {
      queryClient.cancelQueries({ queryKey: [queryKeys.user] });
      const prevousUser: User = queryClient.getQueryData([queryKeys.user]);
      updateUser(response);

      return { prevousUser };
    },
    onError: (_, variable: User, context) => {
      if (context.prevousUser) {
        updateUser(context.prevousUser);
        toast({
          title: 'Update failed.',
          status: 'warning',
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
    },
  });

  return patchUser;
}
