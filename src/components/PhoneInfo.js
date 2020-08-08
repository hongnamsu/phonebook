import React, {Component} from 'react';

class PhoneInfo extends Component {
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        }
    }

    state = {
        // 수정 버튼을 눌렀을 때 editing 값을 true로 설정해줌.
        // 이 값이 true 일 때에는, 기존 텍스트 형태로 보여주던 값을 input 형태로 보여줌
        editing: false,
        // input의 값은 유동적, input 값을 담기 위해 각 필드를 위한 값도 설정.
        name: '',
        phone: '',
    }

    handleRemove = () => {
        // 삭제 버튼이 클릭되면 onRemove에 id 넣어서 호출
        const { info, onRemove}=this.props;
        onRemove(info.id);
    }

    // editing 값을 반전시키는 함수
    // true -> false, false->true
    handelToggleEdit = () => {
        const {editing} = this.state;
        this.setState({editing: !editing});
    }

    // input에서 onChange 이벤트가 발생 될 때 호출되는 함수
    handleChange = (e) => {
        const {name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // editing 값이 바뀔 때 처리할 로직
        // 수정 눌렀을땐 기존 값이 input에 나타남,
        // 수정 적용시엔 input 값들을 부모한테 전달.

        const {info, onUpdate}=this.props;
        if(!prevState.editing && this.state.editing) {
            // editing 값이 false ->true로 전환될 때
            // info의 값을 state로 전달
            this.setState({
                name: info.name,
                phone: info.phone
            })
        }

        if(prevState.editing && !this.state.editing) {
            // editing 값이 true -> false로 전환될 때
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 수정 상태고 아니고, info값이 같다면 리렌더림 안됨
        if (!this.state.editing && !nextState.editing && nextProps.info === this.props.info) { return false; }
        return true;
    }

    render() {

        console.log('render Phone'+this.props.info.id);

        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        const {editing} =this.state;


        // 수정모드

        if(editing) {
            return(
                <div style={style}>
                    <div>
                        <input value={this.state.name} name="name" placeholder="이름" onChange={this.handleChange} />
                    </div>
                    <div>
                        <input value={this.state.phone} name="phone" placeholder="전화번호" onChange={this.handleChange} />
                    </div>
                    <button onClick={this.handelToggleEdit}>적용</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            );            
        }

        // 일반모드

        const {name, phone} = this.props.info;
        return (
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handelToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}

export default PhoneInfo;