/* eslint-disable */
import type { Prisma, User } from '@prisma/client';
import { useContext } from 'react';
import {
    RequestHandlerContext,
    type RequestOptions,
    type PickEnumerable,
    type CheckSelect,
} from '@zenstackhq/swr/runtime';
import * as request from '@zenstackhq/swr/runtime';

export function useMutateUser() {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    const prefixesToMutate = [
        `${endpoint}/user/find`,
        `${endpoint}/user/aggregate`,
        `${endpoint}/user/count`,
        `${endpoint}/user/groupBy`,
    ];
    const mutate = request.getMutate(prefixesToMutate);

    async function createUser<T extends Prisma.UserCreateArgs>(args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>) {
        return await request.post<CheckSelect<T, User, Prisma.UserGetPayload<T>>, true>(
            `${endpoint}/user/create`,
            args,
            mutate,
            fetch,
            true,
        );
    }

    async function createManyUser<T extends Prisma.UserCreateManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserCreateManyArgs>,
    ) {
        return await request.post<Prisma.BatchPayload, false>(
            `${endpoint}/user/createMany`,
            args,
            mutate,
            fetch,
            false,
        );
    }

    async function updateUser<T extends Prisma.UserUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>) {
        return await request.put<Prisma.UserGetPayload<T>, true>(`${endpoint}/user/update`, args, mutate, fetch, true);
    }

    async function updateManyUser<T extends Prisma.UserUpdateManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserUpdateManyArgs>,
    ) {
        return await request.put<Prisma.BatchPayload, false>(`${endpoint}/user/updateMany`, args, mutate, fetch, false);
    }

    async function upsertUser<T extends Prisma.UserUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.UserUpsertArgs>) {
        return await request.post<Prisma.UserGetPayload<T>, true>(`${endpoint}/user/upsert`, args, mutate, fetch, true);
    }

    async function deleteUser<T extends Prisma.UserDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>) {
        return await request.del<Prisma.UserGetPayload<T>, true>(`${endpoint}/user/delete`, args, mutate, fetch, true);
    }

    async function deleteManyUser<T extends Prisma.UserDeleteManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserDeleteManyArgs>,
    ) {
        return await request.del<Prisma.BatchPayload, false>(`${endpoint}/user/deleteMany`, args, mutate, fetch, false);
    }
    return { createUser, createManyUser, updateUser, updateManyUser, upsertUser, deleteUser, deleteManyUser };
}

export function useFindManyUser<T extends Prisma.UserFindManyArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
    options?: RequestOptions<Array<Prisma.UserGetPayload<T>>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<Array<Prisma.UserGetPayload<T>>>(`${endpoint}/user/findMany`, args, options, fetch);
}

export function useFindUniqueUser<T extends Prisma.UserFindUniqueArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
    options?: RequestOptions<Prisma.UserGetPayload<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<Prisma.UserGetPayload<T>>(`${endpoint}/user/findUnique`, args, options, fetch);
}

export function useFindFirstUser<T extends Prisma.UserFindFirstArgs>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>,
    options?: RequestOptions<Prisma.UserGetPayload<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<Prisma.UserGetPayload<T>>(`${endpoint}/user/findFirst`, args, options, fetch);
}

export function useAggregateUser<T extends Prisma.UserAggregateArgs>(
    args?: Prisma.Subset<T, Prisma.UserAggregateArgs>,
    options?: RequestOptions<Prisma.GetUserAggregateType<T>>,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<Prisma.GetUserAggregateType<T>>(`${endpoint}/user/aggregate`, args, options, fetch);
}

export function useGroupByUser<
    T extends Prisma.UserGroupByArgs,
    HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.UserGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.UserGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
        ? `Error: "by" must not be empty.`
        : HavingValid extends Prisma.False
        ? {
              [P in HavingFields]: P extends ByFields
                  ? never
                  : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
          }[HavingFields]
        : 'take' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
            ? ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
            : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends Prisma.True
        ? {}
        : {
              [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields],
>(
    args?: Prisma.SubsetIntersection<T, Prisma.UserGroupByArgs, OrderByArg> & InputErrors,
    options?: RequestOptions<
        {} extends InputErrors
            ? Array<
                  PickEnumerable<Prisma.UserGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.UserGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.UserGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.UserGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<
        {} extends InputErrors
            ? Array<
                  PickEnumerable<Prisma.UserGroupByOutputType, T['by']> & {
                      [P in keyof T & keyof Prisma.UserGroupByOutputType]: P extends '_count'
                          ? T[P] extends boolean
                              ? number
                              : Prisma.GetScalarType<T[P], Prisma.UserGroupByOutputType[P]>
                          : Prisma.GetScalarType<T[P], Prisma.UserGroupByOutputType[P]>;
                  }
              >
            : InputErrors
    >(`${endpoint}/user/groupBy`, args, options, fetch);
}

export function useCountUser<T extends Prisma.UserCountArgs>(
    args?: Prisma.Subset<T, Prisma.UserCountArgs>,
    options?: RequestOptions<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.UserCountAggregateOutputType>
            : number
    >,
) {
    const { endpoint, fetch } = useContext(RequestHandlerContext);
    return request.get<
        T extends { select: any }
            ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.UserCountAggregateOutputType>
            : number
    >(`${endpoint}/user/count`, args, options, fetch);
}
