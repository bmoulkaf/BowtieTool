package models;

public class User {
	private int id;
	private String username;
	private String hash_pw;
	private String token;
	
	
	public User(int id, String username, String hash_pw) {
		super();
		this.id = id;
		this.username = username;
		this.hash_pw = hash_pw;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getHash_pw() {
		return hash_pw;
	}
	public void setHash_pw(String hash_pw) {
		this.hash_pw = hash_pw;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	

}
