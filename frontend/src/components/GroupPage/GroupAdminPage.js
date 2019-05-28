import React from 'react';
import {connect} from 'react-redux';

import NavBar from '../NavBar/NavBar';
import ChangeGroupInfo from './ChangeGroupInfo';
import GroupUserList from './GroupUserList';
import GroupDesignList from './GroupDesignList';
import { toDeleteGroupUser, toDeleteGroupDesign, toChangeGroupInfo, toDeleteGroup, toGiveAdmin } from '../../actions';

class GroupAdminPage extends React.Component {
	constructor(props) {
		super(props)

		this.deleteDesignCheck = this.deleteDesignCheck.bind(this)
		this.deleteUserCheck = this.deleteUserCheck.bind(this)
		this.giveAdminCheck = this.giveAdminCheck.bind(this)
		this.deleteGroupCheck = this.deleteGroupCheck.bind(this)
	}

	deleteDesignCheck(groupid, designid) {
		if(confirm("정말 삭제하시겠습니까?") == true) 
			return this.props.onDeleteDesign(groupid, designid)
		else 
			return false;
	}

	deleteUserCheck(groupid, userid) {
		if(confirm("정말 삭제하시겠습니까?") == true)
			return this.props.onDeleteUser(groupid, userid)
		else 
			return false;
	}

	giveAdminCheck(groupid, userid) {
		if(confirm("정말 관리자 권한을 부여하시겠습니까?") == true)
			return this.props.onGiveAdmin(groupid, userid)
		else 
			return false;
	}

	deleteGroupCheck(groupid) {
		if(confirm("정말 삭제하시겠습니까?") == true)
			return this.props.onDeleteGroup(groupid)
		else 
			return false;
	}

	render() {
		if(!this.props.loading) {
			return (
				<p>loading...</p>
			)
		}

		let admin_userlist = this.props.group_users.filter(user => {
			console.log("username: ", user.username)
			return (user.username !== this.props.user.split(":")[0])
		})

		return (
			<div className="GroupAdminPage">
				<NavBar />

				<section className="wrap clear col3">
					<div className="aside">
						<h2 className="h_white">GROUP INFO</h2>
						<div className="content">
							<ChangeGroupInfo
								group={this.props.now_group}
								onClickChangeSubmit={this.props.onChangeGroupInfo}
							/>
						<br />
							<button onClick={() => this.deleteGroupCheck(this.props.now_group.id)}>DELETE GROUP</button>
						</div>
					</div>
					<div className="main">
						<h2 className="h_white">DESIGNS</h2>
						<div className="content">
						<GroupDesignList
							groupid={this.props.now_group.id}
							designlist={this.props.group_designs}
							onClickDeleteDesign={this.deleteDesignCheck}
						/>

						</div>
					</div>
					<div className="aside">
						<h2 className="h_black">MEMBER LIST</h2>
						<div className="content">
						<GroupUserList
							groupid={this.props.now_group.id}
							userlist={admin_userlist}
							onClickDeleteUser={this.deleteUserCheck}
							onClickGiveAdmin={this.giveAdminCheck}
						/>
						</div>
					</div>
				</section>
				</div>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.authorization,
	now_group: state.now_group,
    group_users: state.group_users,
    group_designs: state.group_designs,
	loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
	onChangeGroupInfo: (groupid, grouptype, groupname) => dispatch(toChangeGroupInfo(groupid, grouptype, groupname)),
	onDeleteDesign: (groupid, designid) => dispatch(toDeleteGroupDesign(groupid, designid)),
	onDeleteUser: (groupid, userid) => dispatch(toDeleteGroupUser(groupid, userid)),
	onGiveAdmin: (groupid, userid) => dispatch(toGiveAdmin(groupid, userid)),
	onDeleteGroup: (groupid) => dispatch(toDeleteGroup(groupid))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupAdminPage);
