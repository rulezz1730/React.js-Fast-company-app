/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
// import GroupList from "../../common/groupList";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";
import SearchUsers from "../../searchUsers";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const pageSize = 8;
    const currentUserId = useSelector(getCurrentUserId());
    const profession = useSelector(getProfessions());

    const professionsLoading = useSelector(getProfessionsStatus());

    const [currentPage, setCurrenPage] = useState(1);
    const [selectedProf, setSelectedProfession] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [search, setSearch] = useState("");

    const users = useSelector(getUsersList());

    const totalPeople = (count) => {
        const renderPhrase = (number, titles) => {
            const cases = [2, 0, 1, 1, 1, 2];
            return titles[
                number % 100 > 4 && number % 100 < 20
                    ? 2
                    : cases[number % 10 < 5 ? number % 10 : 5]
            ];
        };
        if (count > 0) {
            return `${count} человек 
                    ${renderPhrase(count, [
                        "тусанет",
                        "тусанут",
                        "тусанут"
                        // eslint-disable-next-line indent
                    ])}
                    c тобой сегодня`;
        } else {
            return `Никто с тобой сегодня не тусанет`;
        }
    };

    const handleToggleBookMark = (itemId) => {
        const newUsers = users.map((user) => {
            if (user._id === itemId) {
                user.status = !user.status;
            }
            return user;
        });
        console.log(newUsers);
    };

    useEffect(() => {
        setCurrenPage(1);
    }, [selectedProf, search]);

    const handleProfessionSelect = (item) => {
        setSelectedProfession(item);
        setSearch("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrenPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearchChange = ({ target }) => {
        setSearch(target.value);
        setSelectedProfession(undefined);
    };

    function filterUsers(data) {
        const filtredUsers = search
            ? data.filter((user) =>
                  user.name.toLowerCase().includes(search.toLowerCase())
              )
            : selectedProf
            ? data.filter((user) => {
                  return _.isEqual(user.profession, selectedProf._id);
              })
            : data;

        return filtredUsers.filter((u) => u._id !== currentUserId);
    }
    const filtredUsers = filterUsers(users);
    const count = filtredUsers.length;
    const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProfession();
        setSearch("");
    };

    return (
        <div className="d-flex">
            {profession && !professionsLoading && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={profession}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus
                    numberOfPeople={totalPeople(count)}
                    users={users}
                ></SearchStatus>
                {count >= 0 && (
                    <div>
                        {" "}
                        <SearchUsers
                            search={search}
                            onChange={handleSearchChange}
                            name="input"
                        />
                        <UsersTable
                            users={usersCrop}
                            toggleBookmark={handleToggleBookMark}
                            selectedSort={sortBy}
                            onSort={handleSort}
                            // onDelete={handleDelete}
                        />
                    </div>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

UsersListPage.propTypes = {
    // onDelete: PropTypes.func,
    toggleBookmark: PropTypes.func,
    users: PropTypes.array,
    totalPeople: PropTypes.func
};

export default UsersListPage;
