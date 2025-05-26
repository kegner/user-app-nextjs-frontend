import { QueryParams, User } from './types/types';

type UserResponse = {
  id: string;
  createdDate: string;
  firstName: string;
  lastName: string;
  email: string;
};

type QueryResult = {
  users: User[];
  total: number;
};

export const DEFAULT_PAGE_SIZE = 10;

export async function fetchUser(id: string) {
  try {
    const results = await fetch(`${process.env.SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          getUser(id: "${id}") {
            id,
            createdDate,
            firstName,
            lastName,
            email
          }
        }`,
      }),
    });

    const data = await results.json();
    const user = data?.data?.getUser as UserResponse;

    if (user) {
      return {
        ...user,
        createdDate: new Date(user.createdDate),
      };
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}

export async function fetchUsers(params?: QueryParams): Promise<QueryResult> {
  const search = params?.search ? `"${params.search}"` : null;
  const sort = params?.sort ? `"${params.sort}"` : null;
  const page = params?.page ?? 0;
  const pageSize = params?.pageSize ?? DEFAULT_PAGE_SIZE;

  try {
    const results = await fetch(`${process.env.SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          getUsers(params: {
            search: ${search},
            sort: ${sort},
            page: ${page},
            pageSize: ${pageSize},
          }) {
            users {
              id,
              createdDate,
              firstName,
              lastName,
              email
            },
            total
          }
        }`,
      }),
    });

    const data = await results.json();

    const convertedUsers = data?.data?.getUsers?.users.map(
      (user: UserResponse) => ({
        ...user,
        createdDate: new Date(user.createdDate),
      }),
    );

    return {
      users: convertedUsers ?? [],
      total: data?.data?.getUsers?.total ?? [],
    };
  } catch (error) {
    console.error(error);
  }

  return {
    users: [],
    total: 0,
  };
}
